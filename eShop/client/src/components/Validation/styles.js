import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

    paper: {
        borderRadius: 5,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
        [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        },
    },
    button: {
        marginRight: '20px',
        padding: '10px 15px',
        backgroundColor: '#09895D',
        color: '#FFFFFF'
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
          width: 'auto',
          marginTop: 20,
          justifyContent: 'center',
        },
      },

}));