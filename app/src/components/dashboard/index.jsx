import React, { Fragment, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import BreadCrumb from "../BreadCrumb";
import { toast } from "react-toastify";
import { Container, Row, Col, Button, Card, CardHeader, CardBody, Progress } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeMode, doThing, viderError } from "../../redux/allumer/action";
import ClockTime from "../Clock/Clock";
// import Charte from "../Chart-js/Chart";
import smart from "../login/smart.png";
import HumidityGraph from "../Chart-apex/HumidityGraph";
import GazGraph from "../Chart-apex/GazGraph";
import Temperature from "../temperature";
import Humidity from "../temperature/Humidity";
import TempGraph from "../Chart-apex/TempGraph";
const ENDPOINT = process.env.PUBLIC_URL;

function Dashboard() {
  const { msg, openedLight1, mode } = useSelector((state) => state.etatPiece);

  const dispatch = useDispatch();
  dispatch.current = useRef();

  const [modeApp, setModeApp] = useState("normal");
  const [msgAlertDoor, setMsgAlertDoor] = useState("La porte est fermée!");
  const [door, setDoor] = useState("closed");
  const [stateOfClimatiseur, setStateOfClimatiseur] = useState("NONE");
  const [gaz, setGaz] = useState(0);
  const [lumiere, setLumiere] = useState(0);
  const [connectedDevices, setConnectedDevices] = useState(null);
  const [tabOfConnectedDV, setTabOfConnectedDV] = useState([]);
  const [enable, setEnable] = useState(false); //Avoid spaming ESP32

  //socket connections
  useEffect(() => {
    let socket = io(ENDPOINT, {
      secure: true,
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.on("connectDV", (msge) => {
      setConnectedDevices(msge);
    });
    socket.on("connectDVEtat", (msge) => {
      setTabOfConnectedDV(msge);
    });
    socket.on("door", (msg) => {
      setDoor(msg.toString());
    });
    socket.on("Gaz", (msg) => setGaz(Number(msg)));
    socket.on("Lumière", (msg) => setLumiere(Number(msg)));
    socket.on("stateOfClimatiseur", (msg) => {
      setStateOfClimatiseur(msg);
      if (msg === "true")
        toast.success("Etat de climatiseur est ouvert avec succès!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      else if (msg === "false")
        toast.success("Etat de climatiseur est fermé avec succès!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      else if (msg === "NONE")
        toast.info("Etat de climatiseur est déjà en cours, rien à changer!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
    });

    //mode
    socket.on("mode", (msg) => {
      msg === "normal" && setModeApp("Le mode de l'application est initialisée à mode NORMAL.");
      msg === "sécurité" && setModeApp("Le mode de l'application est initialisée à mode SECURITE!");
      dispatch(changeMode(msg));
    });

    //mode sécurité && alerts
    socket.on("alert", (msg) => {
      msg === "door_is_open" && setMsgAlertDoor("La porte est fermée! Mode sécurité est activée!");
      msg === "door_is_closed" && setMsgAlertDoor("La porte est ouverte! Mode sécurité est activée!");
    });
  }, [ENDPOINT]);

  //showing msgs
  useEffect(() => {
    modeApp !== "normal" &&
      toast.info(modeApp, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 8000,
      });
  }, [modeApp]);
  useEffect(() => {
    msgAlertDoor !== "La porte est fermée!" &&
      toast.error(msgAlertDoor, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 7000,
      });
  }, [msgAlertDoor]);

  //show connected Devices
  useEffect(() => {
    connectedDevices &&
      toast.info(`You have ${connectedDevices}!`, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 4000,
      });
  }, [connectedDevices]);

  //Show if user did something (turn on light, adjust AirConditionner Temperature...)
  useEffect(() => {
    if (msg?.length) {
      toast.success(msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      setEnable(false);
      dispatch(viderError());
    }
  }, [msg]);
  return (
    <Fragment>
      <BreadCrumb main="Informations générales" child="Dashboard" time={<ClockTime />} />
      <Container>
        <Row>
          <Col md={3}>
            <Card>
              <CardHeader style={{ padding: "20px" }}>
                <h4>Connected Devices</h4>
              </CardHeader>
              <CardBody style={{ padding: "20px", height: 140, overflowY: "scroll" }}>
                <h3>{connectedDevices ? " " + connectedDevices : " Loading..."}</h3>
                <h6>List of connected Modules:</h6>
                {tabOfConnectedDV.length &&
                  tabOfConnectedDV.map((eesp) => (
                    <>
                      <span>{eesp}</span>
                      <br />
                    </>
                  ))}
              </CardBody>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <CardHeader style={{ padding: "20px" }}>
                <h4>Bienvenue utilisateur</h4>
              </CardHeader>
              <CardBody style={{ padding: "20px", height: 140, overflowY: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h5>Municipalité connectée</h5>
                  <img
                    className="img-fluid for-light"
                    src={smart}
                    alt="login smart municipality"
                    style={{ width: "145px", height: "75px" }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <CardHeader style={{ padding: "20px 20px 1.5px 20px" }}>
                <h5 className="mb-1">Performance serveur</h5>
                <i>NB: C'est une approximation!</i>
              </CardHeader>
              <CardBody style={{ padding: "10px 20px 20px", height: 140, overflowY: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: "#0dcaf0",
                      }}
                    ></div>
                    Elevé
                  </div>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: "#0d6efd",
                      }}
                    ></div>
                    Bas
                  </div>
                </div>
                <h6>Performance élevée</h6>
                <Progress
                  className="sm-progress-bar"
                  striped
                  color="info"
                  value={(lumiere * 1000) / (65536 / 2)}
                  style={{ height: "5px" }}
                />
                <h6 className="mt-4">Performance basse</h6>
                <Progress
                  className="sm-progress-bar"
                  striped
                  color="primary"
                  value={(lumiere * 1000) / 65536}
                  style={{ height: "5px" }}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <CardHeader style={{ padding: "20px" }}>
                <h4 className="mb-1">Mode d'application</h4>
              </CardHeader>
              <CardBody style={{ padding: "20px", height: 140 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <Button
                    disabled={tabOfConnectedDV.indexOf("stationControlPresence") === -1}
                    size={"sm"}
                    style={{
                      backgroundColor: mode === "normal" ? "#0dcaf0" : "#c9cdd0",
                      border: 0,
                      padding: 6,
                      color: "black",
                    }}
                    onClick={() => mode !== "normal" && dispatch(doThing("mode normal"))}
                  >
                    Normal
                  </Button>
                  <Button
                    disabled={tabOfConnectedDV.indexOf("stationControlPresence") === -1}
                    size={"sm"}
                    style={{ backgroundColor: "#c9cdd0", border: 0, padding: 6, color: "black" }}
                  >
                    Automatique
                  </Button>{" "}
                  <Button
                    disabled={tabOfConnectedDV.indexOf("stationControlPresence") === -1}
                    size={"sm"}
                    style={{
                      backgroundColor: mode === "sécurité" ? "#0dcaf0" : "#c9cdd0",
                      border: 0,
                      padding: 6,
                      color: "black",
                    }}
                    onClick={() => mode !== "sécurité" && dispatch(doThing("mode sécurité"))}
                  >
                    Sécurité
                  </Button>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <h6>
                    <i>{mode === "normal" ? "Mode normal activé" : mode === "sécurité" && "Mode sécurité activé"}</i>
                  </h6>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <BreadCrumb main="Données graphiques" child="Dashboard" />
      <Container>
        <Row className="justify-content-md-center">
          <Col xl="12">
            <Card>
              <CardHeader style={{ padding: "15px" }}>
                <h3 className="text-center">Chambre 1</h3>
              </CardHeader>
              <CardBody style={{ padding: "10px" }}>
                {/* <Row className="justify-content-md-center">
                  {tabOfConnectedDV.indexOf("stationControlInfraRouge") !== -1 ? (
                    openedLight1 === false ? (
                      <Button
                        className="btn-pill btn-air-primary"
                        onClick={() => {
                          dispatch(doThing("eteindre lampe 1"));
                          setEnable(true);
                        }}
                        disabled={enable}
                      >
                        Close
                      </Button>
                    ) : (
                      <Button
                        className="btn-pill btn-air-success"
                        onClick={() => {
                          dispatch(doThing("allumer lampe 1"));
                          setEnable(true);
                        }}
                        disabled={enable}
                      >
                        Open Lampe 1
                      </Button>
                    )
                  ) : (
                    "Loading..."
                  )}
                </Row>
                <hr />
                <Row className="justify-content-md-center">
                  {tabOfConnectedDV.indexOf("stationControlInfraRouge") !== -1 ? (
                    <Button className="btn-pill btn-air-primary">Open Lampe 2</Button>
                  ) : (
                    "Loading..."
                  )}
                </Row>
                <hr />
                <Row className="justify-content-md-center">
                  {tabOfConnectedDV.indexOf("stationControlInfraRouge") !== -1 ? (
                    <Button className="btn-pill btn-air-primary">Open Lampe 3</Button>
                  ) : (
                    "Loading..."
                  )}
                </Row> */}
                <Row className="justify-content-md-center">
                  <Col md={4}>
                    <TempGraph />
                  </Col>
                  <Col md={4}>
                    <HumidityGraph />
                  </Col>
                  <Col md={4}>
                    <GazGraph />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          {/* <Col xl="4">
            <Card>
              <CardHeader style={{ padding: "15px" }}>
                <h3 className="text-center">Chambre 2</h3>
              </CardHeader>
              <CardBody>
                <Row className="justify-content-md-center">
                  {tabOfConnectedDV.indexOf("stationControlInfraRouge") !== -1 ? (
                    <Button
                      className="btn-pill btn-air-primary"
                      onClick={() => dispatch(doThing("allumer climatiseur"))}
                    >
                      Open Climatiseur
                    </Button>
                  ) : (
                    "Loading..."
                  )}
                </Row>
                <hr />
                <Row className="justify-content-md-center">
                  {tabOfConnectedDV.indexOf("stationControlInfraRouge") !== -1 ? (
                    <Button
                      className="btn-pill btn-air-primary"
                      onClick={() => dispatch(doThing("eteindre climatiseur"))}
                    >
                      Close Climatiseur
                    </Button>
                  ) : (
                    "Loading..."
                  )}
                </Row>
                <hr />
                <Row className="justify-content-md-center">
                  {tabOfConnectedDV.indexOf("stationControlInfraRouge") !== -1 ? (
                    <Button className="btn-pill btn-air-primary" disabled>
                      {stateOfClimatiseur === "false" ? "Climatiseur Fermé" : "Climatiseur Ouvert"}
                    </Button>
                  ) : (
                    "Loading..."
                  )}
                </Row>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
        <Row>
          <h3>Informations de la chambre 1:</h3>
          <Col xl="4">
            <Card>
              <CardHeader style={{ padding: "15px" }}>
                <h4 className="text-center">Données de la lumière</h4>
              </CardHeader>
              <CardBody style={{ padding: "20px", height: 150, overflowY: "hidden" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h6>Chambre 1</h6>
                  <h3> {lumiere} lux.</h3>
                </div>
                <hr />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <div>
                    {tabOfConnectedDV.indexOf("lampe1") !== -1 ? (
                      <Button
                        className="btn-pill btn-air-primary"
                        style={{ padding: "6px 10px" }}
                        onClick={() => dispatch(doThing("allumer lampe1"))}
                      >
                        Ouvrir la lampe 1
                      </Button>
                    ) : (
                      "Loading..."
                    )}
                  </div>
                  <div>
                    {tabOfConnectedDV.indexOf("lampe1") !== -1 ? (
                      <Button
                        className="btn-pill btn-air-primary"
                        style={{ padding: "5px 10px" }}
                        onClick={() => dispatch(doThing("eteindre lampe1"))}
                      >
                        Fermer la lampe 1
                      </Button>
                    ) : (
                      "Loading..."
                    )}
                  </div>
                  {/* <div>Loading...</div>
                  <div>Loading...</div> */}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card>
              <CardHeader style={{ padding: "15px" }}>
                <h4 className="text-center">Données de présence</h4>
              </CardHeader>
              <CardBody style={{ padding: "20px", height: 150, overflowY: "hidden" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h6>Chambre 1:</h6>
                  </div>
                  <div>
                    <h4>Porte: {door === "closed" ? "fermée" : "ouverte"}</h4>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card>
              <CardHeader style={{ padding: "15px" }}>
                <h4 className="text-center">À voir</h4>
              </CardHeader>
              <CardBody style={{ padding: "20px", height: 150, overflowY: "hidden" }}>
                {/* <h3>Tao narj3oulhaaaaaa</h3> */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <div>
                    {tabOfConnectedDV.indexOf("stationControlInfraRouge") !== -1 ? (
                      <Button
                        className="btn-pill btn-air-primary"
                        style={{ padding: "6px 10px" }}
                        onClick={() => dispatch(doThing("allumer climatiseur"))}
                      >
                        Ouvrir le climatiseur
                      </Button>
                    ) : (
                      "Loading..."
                    )}
                  </div>
                  <div>
                    {tabOfConnectedDV.indexOf("stationControlInfraRouge") !== -1 ? (
                      <Button
                        className="btn-pill btn-air-primary"
                        style={{ padding: "5px 10px" }}
                        onClick={() => dispatch(doThing("eteindre climatiseur"))}
                      >
                        Fermer le climatiseur
                      </Button>
                    ) : (
                      "Loading..."
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <hr />
          <h3>Informations de la chambre 2:</h3>
          <Col xl="4">
            <Card>
              <CardHeader style={{ padding: "15px" }}>
                <h4 className="text-center">Données de la lumière</h4>
              </CardHeader>
              <CardBody style={{ padding: "20px", height: 150, overflowY: "hidden" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h6>Chambre 2</h6>
                  <h3> {lumiere} lux.</h3>
                </div>
                <hr />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  {/* <div>
                    {tabOfConnectedDV.indexOf("stationControlInfraRouge") !== -1 ? (
                      <Button
                        className="btn-pill btn-air-primary"
                        style={{ padding: "6px 10px" }}
                        onClick={() => dispatch(doThing("allumer climatiseur"))}
                      >
                        Ouvrir la lampe
                      </Button>
                    ) : (
                      "Loading..."
                    )}
                  </div>
                  <div>
                    {tabOfConnectedDV.indexOf("stationControlInfraRouge") !== -1 ? (
                      <Button
                        className="btn-pill btn-air-primary"
                        style={{ padding: "5px 10px" }}
                        onClick={() => dispatch(doThing("eteindre climatiseur"))}
                      >
                        Fermer la lampe
                      </Button>
                    ) : (
                      "Loading..."
                    )}
                  </div> */}
                  <div>Loading...</div>
                  <div>Loading...</div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card>
              <CardHeader style={{ padding: "15px" }}>
                <h4 className="text-center">Données de présence</h4>
              </CardHeader>
              <CardBody style={{ padding: "20px", height: 150, overflowY: "hidden" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h6>Chambre 2:</h6>
                  </div>
                  <div>
                    <h4>Porte: {door === "closed" ? "fermée" : "ouverte"}</h4>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card>
              <CardHeader style={{ padding: "15px" }}>
                <h4 className="text-center">À voir</h4>
              </CardHeader>
              <CardBody style={{ padding: "20px", height: 150, overflowY: "hidden" }}>
                <h3>Tao narj3oulhaaaaaa</h3>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <BreadCrumb main="Indicateurs graphiques" child="Dashboard" />
      <Container fluid={false}>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Humidity />
          </Col>
          <Col md={6}>
            <Temperature />
          </Col>
        </Row>
      </Container>
      {/* <Container fluid={true}>
        <BreadCrumb main="Courbes" child="Dashboard" />
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Card>
              <CardHeader style={{ padding: "15px" }}>
                <h5 className="text-center">Humidité en %</h5>
              </CardHeader>
              <CardBody style={{ padding: "15px" }}>
                <Row className="justify-content-md-center">
                  <Col md={12}>
                    <HumidityGraph />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardHeader style={{ padding: "15px" }}>
                <h5 className="text-center">Temperature °C</h5>
              </CardHeader>
              <CardBody style={{ padding: "15px" }}>
                <Row className="justify-content-md-center">
                  <Col md={12}>
                    <TempGraph />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container> */}
      <Container>
        {/* <h3>La porte est: {door === "closed" ? "fermée" : "ouverte"}</h3>
        <h3>Gaz est: {gaz} ppm</h3>
        <h3>Lumière est: {lumiere} lux.</h3> */}
        <br />
        <br />
        <br />
        <br />
      </Container>
    </Fragment>
  );
}

export default Dashboard;
