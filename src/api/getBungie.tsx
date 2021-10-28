import axios from "axios";

const basePath = "https://www.bungie.net/Platform";

const getMembershipDataForCurrentUser = (token: string) => {
  return axios.get(`${basePath}/User/GetMembershipsForCurrentUser/`, {
    headers: {
      "X-API-Key": process.env.REACT_APP_BUNGIE_API_KEY,
      Authorization: "Bearer " + token,
    },
  });
};

const getProfile = (token: string, membershipType: number, destinyMembershipId: string) => {
  return axios.get(`${basePath}/Destiny2/${membershipType}/Profile/${destinyMembershipId}/`, {
    headers: {
      "X-API-Key": process.env.REACT_APP_BUNGIE_API_KEY,
      Authorization: "Bearer " + token,
    },
    params: {
      components: 201,
    },
  });
};

export { getMembershipDataForCurrentUser, getProfile };
