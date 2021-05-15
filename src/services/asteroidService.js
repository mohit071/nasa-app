import http from './httpService';

export function getAsteroids(asteroidId){
    const getAsteroidsUrl = `https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=rchOydRl6eFK1Lzgw97e42BagIw1lMRCbruF9R37`;
    return http.get(getAsteroidsUrl);
}

export function getRandomAsteroid(){
    const getRandomAsteroidUrl = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=rchOydRl6eFK1Lzgw97e42BagIw1lMRCbruF9R37`;
    return http.get(getRandomAsteroidUrl);
}

const asteroidService = {
    getAsteroids,
    getRandomAsteroid
};

export default asteroidService;
