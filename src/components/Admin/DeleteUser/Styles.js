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
  deleteButton: {
    display: 'inline-block',
  }
});

export default styles;