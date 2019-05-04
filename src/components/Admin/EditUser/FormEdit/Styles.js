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
  formControl: {
    width: 200,
    marginLeft: 8,
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
    position: 'relative',
    left: '-29px',
    top: '17px',
    float: 'right',
    width: '36%',
    // marginRight: '128px',
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