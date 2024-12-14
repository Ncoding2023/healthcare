import React from 'react';
// import { AiFillPhone } from "react-icons/ai";
function Footer() {
  // const style
  const footerStyle: React.CSSProperties  = {
    // backgroundColor: '#003366', // 푸터 배경을 짙은 파란색으로 설정
    color: '#003366',
    textAlign: 'center',
    padding: '15px',
    marginTop: '20px',
  };

  const linkStyle = {
    color: '#FFA500', // 링크는 주황색으로 포인트
    margin: '0 10px',
    textDecoration: 'none',
  };

  return (
    <footer style={footerStyle} className='footer'>
      <p>&copy; 2024 My Exercise Routines. For your health</p>
      <p>☎ 010 2900 6013</p>
      <p>
        <a href="https://facebook.com" style={linkStyle} target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        |
        <a href="https://twitter.com" style={linkStyle} target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        |
        <a href="https://instagram.com" style={linkStyle} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </p>
    </footer>
  );
}

export default Footer;
