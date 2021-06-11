import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

//@ts-ignore
import BGImage from './images/back.jpg';

export const GlobalStyle = createGlobalStyle` 
    html{
        height: 100%;
    }

    body {
        background-image: url(${BGImage});
        background-size: cover;
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content: center;

    }

    * {
        box-sizing: border-box;
        font-family: 'Catamaran', sans-serif;
    }

    background: red;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    > p {
        color: #000;

    }

    .score {
        color: #000;
        font-size:2rem;
        margin: 0;
    }

    h1 {
        font-family: Fascinate Inline;
        background-image: linear-gradient(180deg,#fff,#87f1ff);
        background-size: 100%;
        background-clip: text;
        --webkit-background-clip: text;
        --webkit-text-fill-color: transparent;
        --moz-background-clip: text;
        --moz-text-fill-color: transparent;

        filter: drop-shadow(2px 2px #0085a3);
        font-size: 70px;
        font-weight: 400;
        text-align: center;
        margin: 20px;
    }

    h4 {
        width: 250px;
        padding-bottom: 10px;
        margin: 0px;
        text-align: center
    }

    .start, .next{
        cursor: pointer;
        background:linear-gradient(180deg, #fff, #ebfeff);
        border: 2px solid #0085a3;
        box-shadow: 0px 5px 10px rgba(0,0,0,0.25);
        border-radius: 10px;
        height: 2.2em;
        margin: 20px 0;
        padding: 0 2.2em;
        

        
    }

    .start {
        max-width: 300px;
        font-size: 1.5em;
        :hover{
        opacity: 0.9;
        animation-name: pulse;
        animation-duration: .6s;
        animation-iteration-count: infinite;
        }
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }
    }

    .difficultySelect{
        width: 200px;
        text-align: left;
        
    }

    .difficultyBox{
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #ebfeff;
        border-radius: 10px;
        border: 2px solid #0085a3;
        padding: 15px;
        margin: 0px 3px 0px 3px;
    }

    .Collapsible {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    

    .Collapsible__trigger {
        font-size: 1em;
        cursor: pointer;
        color:  #0085a3;
        border: 2px solid #0085a3;
        border-radius: 10px;
        margin: 2%;
        padding: 10px 40px 10px 20px;
        
        transition: transform .1s, opacity .1s;
        
        :hover{
        opacity: 0.9;
        transform: scale(1.03);
        }

        &:after{
        margin: 0px 0px 0px 15px;
        content: '|';
        position: absolute;
        
        transform: rotate(90deg);
        transform-origin: center;
        transition: transform 300ms;
                
        }


        &.is-open {
            &:after {
            transform: rotate(0deg);
            }
        }
    }

 
    &.is-open {
    .Collapsible__trigger::after {
      transform: rotateZ(180deg);
    }
  }

    .Collapsible__contentInner {
        display:flex; 
        flex-direction: row;    
            
  }



`
