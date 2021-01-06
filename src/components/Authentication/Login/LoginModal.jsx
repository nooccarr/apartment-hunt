import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #fff',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '25%',
    height: '600px',
    borderRadius: '2px',
    outline: 'none',
  },
}));

const LoginModal = ({ Login, openModal, modalOpen }) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        open={modalOpen}
        onClose={() => openModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={modalOpen}>
          <div className={classes.paper}>{Login}</div>
        </Fade>
      </Modal>
    </div>
  );
};

export default LoginModal;
