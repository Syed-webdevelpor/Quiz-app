import styled from 'styled-components'
type buttonprops = {
    correct : boolean;
    userclicked : boolean;
}
 export const ButtonWraper = styled.div<buttonprops>`
button {
    background : ${({correct,userclicked}) =>
correct? 'linear-gradient(90deg,#56ffa4,#59bc86)'
: !correct && userclicked?
 'linear-gradient(90deg,#ff5656,#c16868)'
 : 'linear-gradient(90deg,#56ccff,#6eafb4)'
}
}

`;
