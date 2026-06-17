import Keycloak from "keycloak-js";

const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL || window.location.origin;

const keycloak = new Keycloak({
  url: keycloakUrl,
  realm: "viajesgvr",
  clientId: "viajesgvr-frontend",
});

export default keycloak;