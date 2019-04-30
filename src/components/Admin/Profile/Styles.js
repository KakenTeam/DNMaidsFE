const styles = theme => ({
  profile: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: 1200,
  },
  updateProfileBtn: {
    position: 'relative',
    top: 43,
    left: -200,
  },
  updatePasswordBtn: {
    position: 'relative',
    top: 43,
    left: 0,
  },
  button: {
    margin: theme.spacing.unit,
    marginLeft: 0,
  },
  input: {
    display: 'none',
  },
});

export default styles;