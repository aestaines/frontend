export const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };
  
  export const isAdmin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = atob(token.split('.')[1]); // Decode the payload (second part of JWT)
        const parsedToken = JSON.parse(decodedToken);
        console.log(parsedToken); // Check if parsedToken has the required role info
      } catch (error) {
        console.error("Error decoding the token:", error);
      }
    }
    return false;
  };