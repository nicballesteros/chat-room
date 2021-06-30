import axios from 'axios';

// import io from 'socket.io-client';

let protocol = 'http://';
let hostname = location.hostname;
let port = 3000;

/**
 * @description usersExists recieves an array of usernames and checks with the database that
 * the users actually within the database.
 * 
 * @param {Array} usernames 
 * @returns {Boolean} whether the users exist or not
 */

const usersExists = async (usernames) => {
    try {
        //Ask the server if the usernames listed exist.
        let res = await axios.post(`${protocol}${hostname}:${port}/api/user/exists`, {
            usernames: usernames,
        });

        console.log(`${protocol}${hostname}${port}/api/user/exists`);

        if (!res) {
            throw new Error('No response from server');
        }

        if (!res.data.exists) {
            return false;
        }

        return true;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

//TODO Document createNewThread.

/**
 * 
 * @param {*} usernames 
 * @returns 
 */

const createNewThread = async (usernames) => {
    try {
        //Ask the server to make a new thread.
        let res = await axios.post('http://localhost:3000/api/user/newthread', {
          usernames: usernames,
        });

        if (!res) {
            throw new Error('No response from server');
        }

        return res.data.success;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

/**
 * @description getThreads gets the threads that the user has access to from the server.
 * 
 * @returns {Array} An array of the threads that the user has access to.
 */

const getThreads = async (httpClient) => {
    try {
        let res = await httpClient.get(`${protocol}${hostname}:${port}/api/user/getthreads`);

        if (!res) {
            throw new Error('No response from server');
        }

        return res.threads;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const getMessageSocket = async (threadId) => {
    try {
        console.log(threadId);
        // return io.
    } catch (err) {
        console.error(err);
    }
};

export {
    usersExists,
    createNewThread,
    getThreads,
    getMessageSocket,
}