import { AccessToken, logout } from 'contexts/helpers';
import { axiosInstance, errorHelper, generateSuccess, performCallback } from './axiosInstance';

class API {
  displayAccessToken() {
    console.log(AccessToken);
  }

  /**
   * @author Sanchit Dang
   * @description Login API endpoint
   * @param {Object} loginDetails Login details for the user
   * @returns {Object} responseObject
   */
  login(loginDetails) {
    return axiosInstance.post('login', loginDetails).then(response => {
      return generateSuccess(response.accessToken);
    }).catch(error => errorHelper(error, "login"));
  }

  /**
  * @author Sanchit Dang
  * @description AccessToken Login API endpoint
  * @returns {Object} responseObject
  */
  accessTokenLogin() {
    return axiosInstance.post('accessTokenLogin', {}, {
      headers: {
        authorization: "Bearer " + AccessToken
      }
    }).then(() => generateSuccess(AccessToken)).catch(error => errorHelper(error));
  }


  getVideoStories(callback) {
    axiosInstance.get("videoStories/getVideoStories").then((response) => {
      performCallback(callback, response.data.data.stories);
    }).catch(error => errorHelper(error));
  }

  getMemoryWalks(callback) {
    axiosInstance.get("memoryWalk/getAllMemoryWalks").then((response) => {
      performCallback(callback, response.data.data);
    }).catch(error => errorHelper(error));
  }

  getArchieves(callback) {
    axiosInstance.post("memory/getMemories", {
      "numberOfRecords": 0,
      "currentPageNumber": 0
    }).then((response) => {
      performCallback(callback, response.data.data.data);
    }).catch(error => errorHelper(error));
  }

  getTeamMembers(callback) {
    return axiosInstance.get('teamMember/getAll').then((response) => {
      performCallback(callback, response.data.data);
    }).catch(error => {
      errorHelper(error);
    });
  }

  getProjectStory(callback) {
    return axiosInstance.get(`projectStory`
    ).then((response) => {
      performCallback(callback, response.data.data);
    }).catch(error => {
      performCallback(callback, { error: true });
      errorHelper(error);
    });
  }

  getProjectStoryUsingId(id, callback) {
    return axiosInstance.get(`projectStory/${id}`
    ).then((response) => {
      performCallback(callback, response.data.data);
    }).catch(error => {
      performCallback(callback, { error: true });
      errorHelper(error);
    });
  }



  logoutUser(callback) {
    logout();
    performCallback(callback);
  }
}
const instance = new API();
export default instance;
