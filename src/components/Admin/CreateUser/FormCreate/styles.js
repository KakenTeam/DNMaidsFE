const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  AddButton: {
    position: 'absolute',
    top: 100,
  }, 
  editForm: {
    width: '40%',
    float: 'right',
    marginTop: '54px',
    marginRight: '10px',
  },
  buttonWrapper: {
    width: '100%',
  },
  buttons: {
    display: 'inline-block',
    float: 'right',
    marginTop: '25px',
    marginRight: '60px',
    marginBottom: '16px',
  },
  submitBtn: {
    marginLeft: '5px',
  }
});

export default styles;