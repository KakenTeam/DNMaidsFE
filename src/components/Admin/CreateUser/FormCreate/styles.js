const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: 200,
    marginLeft: 8,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 235,
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
    left: '56%',
    width: '40%',
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
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

export default styles;