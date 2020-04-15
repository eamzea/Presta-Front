import React, { useState, useContext } from "react";
import UserContext from "../utils/user.context";
import LendService from "../services/lendService";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import RubberBand from "react-reveal/RubberBand";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { TextField, Grid } from "@material-ui/core";
import {
  AccountCircle,
  Face,
  MailOutline,
  VpnKey,
  PhoneIphoneOutlined,
} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import ButtonM from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const CssTextField = withStyles({
  root: {
    color: "black",
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const EditProfile = (props) => {
  const history = useHistory();

  const [userState, updateUserState] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const { user, updateUser } = useContext(UserContext);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);

    const lendService = new LendService();

    const uploadImg = new FormData();

    uploadImg.append("profilePic", userState.profilePic);

    lendService.uploadProfilePhoto(uploadImg).then((res) => {
      updateUserState(
        Object.assign({}, userState, { profilePic: res.data.secure_url })
      );
    });
  };

  const handleShow = () => setShow(true);

  const [userFileState, updateUserFileState] = useState();

  const classes = useStyles();

  const isReady = () => {
    if (userState.password === userState.confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateUserState(Object.assign({}, userState, { [name]: value }));
  };

  const handleFile = (e) => {
    if (e.target.files[0]) {
      updateUserFileState(URL.createObjectURL(e.target.files[0]));
      updateUserState(
        Object.assign({}, userState, { profilePic: e.target.files[0] })
      );
      handleShow();
    }
  };

  const handleEdit = () => {
    const lendService = new LendService();

    if (userState.name === "") {
      userState.name = user.name;
    } else if (userState.username === "") {
      userState.username = user.username;
    } else if (userState.email === "") {
      userState.email = user.email;
    } else if (userState.phone === "") {
      userState.phone = user.phone;
    }

    lendService.editProfile(user.username, userState).then((res) => {
      // history.push(`/profile/${res.data.username}`);
    });
  };

  return (
    <Container
      fluid
      className="edit-profile-page d-flex justify-content-center align-items-center"
    >
      <Row className="my-5 edit-profile-row">
        <RubberBand>
          <Col xs={11} lg={4} className="edit-profile-box">
            <p className="h3 text-center titles">Edita tu perfil</p>
            <Row className="justify-content-center align-items-center my-5">
              <Col
                xs={8}
                className="d-flex justify-content-center align-items-center"
              >
                <Avatar>H</Avatar>
              </Col>
              <Col xs={8}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <Face />
                  </Grid>
                  <Grid item>
                    <CssTextField
                      defaultValue={user.name}
                      id="input-with-icon-grid"
                      label="Nombre"
                      className="text"
                      name="name"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Col>
              <Col xs={8}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item>
                    <CssTextField
                      defaultValue={user.username}
                      id="input-with-icon-grid"
                      label="Usuario"
                      className="text"
                      name="username"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Col>
              <Col xs={8}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <MailOutline />
                  </Grid>
                  <Grid item>
                    <CssTextField
                      defaultValue={user.email}
                      id="input-with-icon-grid"
                      label="Correo"
                      className="text"
                      name="email"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Col>
              <Col xs={8}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <PhoneIphoneOutlined />
                  </Grid>
                  <Grid item>
                    <CssTextField
                      defaultValue={user.phone}
                      id="input-with-icon-grid"
                      label="Celular"
                      className="text"
                      name="phone"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Col>
              <Col xs={8}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <VpnKey />
                  </Grid>
                  <Grid item>
                    {isReady() ? (
                      <CssTextField
                        id="input-with-icon-grid"
                        label="Nueva Contraseña"
                        className="text"
                        name="password"
                        type="password"
                        onChange={handleChange}
                      />
                    ) : (
                      <CssTextField
                        error
                        helperText="Las contraseñas no coinciden"
                        id="input-with-icon-grid"
                        label="Nueva Contraseña"
                        className="text"
                        name="password"
                        type="password"
                        onChange={handleChange}
                      />
                    )}
                  </Grid>
                </Grid>
              </Col>
              <Col xs={8}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <VpnKey />
                  </Grid>
                  <Grid item>
                    {isReady() ? (
                      <CssTextField
                        id="input-with-icon-grid"
                        label="Confirma Contraseña"
                        className="text"
                        name="confirmPassword"
                        type="password"
                        onChange={handleChange}
                      />
                    ) : (
                      <CssTextField
                        error
                        helperText="Las contraseñas no coinciden"
                        id="input-with-icon-grid"
                        label="Confirma Contraseña"
                        className="text"
                        name="confirmPassword"
                        type="password"
                        onChange={handleChange}
                      />
                    )}
                  </Grid>
                </Grid>
              </Col>
              <Col xs={8}>
                <div className={classes.root}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    name="photo"
                    type="file"
                    onChange={handleFile}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    name="img"
                    type="file"
                    onChange={handleFile}
                  />
                  <label htmlFor="contained-button-file">
                    <ButtonM
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      Subir imagen
                    </ButtonM>
                  </label>
                </div>
              </Col>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Imagen seleccionada</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center align-items-center">
                  <img
                    className="edit-profile-modal rounded-circle"
                    src={userFileState}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    name="photo"
                    type="file"
                    onChange={handleFile}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    name="img"
                    type="file"
                    onChange={handleFile}
                  />
                  <label htmlFor="contained-button-file">
                    <ButtonM
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      Elegir otra imagen
                    </ButtonM>
                  </label>
                  <Button variant="primary" onClick={handleClose}>
                    Guardar imagen
                  </Button>
                </Modal.Footer>
              </Modal>
              <Col
                xs={8}
                className="d-flex justify-content-start align-items-center mt-5"
              >
                {isReady() ? (
                  <Button variant="dark" className="text" onClick={handleEdit}>
                    Actualizar
                  </Button>
                ) : (
                  <Button
                    variant="dark"
                    className="text"
                    disabled
                    onClick={handleEdit}
                  >
                    Actualizar
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        </RubberBand>
      </Row>
    </Container>
  );
};

export default EditProfile;