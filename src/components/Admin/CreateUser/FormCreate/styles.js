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
  createForm: {
    position: 'relative',
    top: '18px',
    left: '60%',
    width: '36%',
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