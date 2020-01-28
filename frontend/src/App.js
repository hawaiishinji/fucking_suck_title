import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function App() {

  const classes = useStyles();
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');
  const [apiResultMessage, setApiResultMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  }

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  }
  
  const handleClick = () => {
    console.log('click', message, link)
    if (!link || link === '' || !link.startsWith('http')) {

      setApiResultMessage((<div>沒有填寫連結</div>))
      return
    }

    axios.post('/api/post', {message, link}).then((result) => {
      console.log('result', result.data)
      setMessage('')
      setLink('')
      const linkUrl = `https://www.facebook.com/${result.data.id}`
      setApiResultMessage((<div>送出成功 <Link href={linkUrl}>FB 文章連結</Link></div>))
    }).catch((err)=>{
      if (err.response) {
        
        console.log('error', err.response.data)
      } else {

        console.log('error', err)
      }
      setApiResultMessage((<div>送出失敗</div>))
    })

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          靠北爛標題
        </Typography>
        <p>
          請輸入留言以及爛標題的連結
        </p>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            multiline
            rows="4"
            fullWidth
            id="message"
            label="留言"
            name="message"
            size="medium"
            autoFocus
            value={message}
            onChange={handleMessageChange} 
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="link"
            label="連結"
            id="link"
            size="small"
            value={link}
            onChange={handleLinkChange}
          />
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >送出</Button>
        </form>
        {apiResultMessage}
      </div>
    </Container>
  );
}

export default App;
