export default {
    palette: {
      primary: {
        light: '#4d4c56',
        main: '#21202C',
        dark: '#17161e',
        contrastText: '#fff'
      },
      secondary: {
        light: '#fecc5f',
        main: '#FEC038',
        dark: '#b18627',
        contrastText: '#fff'
      }
    },
    typography: {
      useNextVariants: true
    },
    styling: {
      windowContainer: {
        textAlign: 'center',
        marginTop: 50
      },
      paperGrid: {
          marginTop: '15%'
      },
      logoPaper: {
          borderRadius: '10px',
          backgroundColor: 'rgb(11, 10, 14)',
          minWidth: '75%',
          position: 'absolute',
          left: '12.5%',
          top: '-15%'
      },
      formPaper: {
          textAlign: 'center',
          borderRadius: '10px',
          backgroundColor: 'rgb(254, 192, 56)',
          minHeight: '100%',
          minWidth: '100%',
          position: 'relative',
          paddingBottom: '5%'
      },
      image: {
          margin: '20px auto 10px auto'
      },
      textField: {
          margin: '5px auto 5px auto',
          minWidth: '50%',
          width: '70%',
          background: 'rgb(254, 192, 56)'
      },
      button: {
          marginTop: 20,
          width: '70%',
          position: 'relative',
      },
      progress: {
          position: 'absolute'
      }
    }
  }