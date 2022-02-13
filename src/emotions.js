import {css} from "@emotion/react"
import styled from "@emotion/styled"

const headerStyle = props => 
    css `
    header{
        margin-top: .3em;
        // background-color: antiquewhite;
        text-align: center;
        font-size: 4em;
        font-family: $font-title;
        .button{
          font-size: .2em;
        }
        .title-input{
          font-size: inherit;
          & input{
            width: 100%;
            font-size: 1em;
            font-family: $font-title;
          }
        }
      }
    `

const containerStyle = props => 
      css `
        // background-color: cornsilk;
        width: 100%;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &.row{
            flex-direction: row;
        }
        &.right{
            justify-content: flex-end;
            // background-color: darkblue;
        }
        &.left{
            justify-content: flex-start;
        }
        &.ac{
            align-items: center;
        }
      `

const buttonStyle = props =>
    css `
        font-size: inherit;
        padding: .4em .8em;
        // background-color: crimson;
        background-color: white;
        border: 1.5px solid lightgray;
        box-shadow: 5px 5px 10px $shadow-gray;
        border-radius: .8em;
        font-family: $font-2;
        cursor: pointer;
        transition: all .2s ease;
        color: ${props.color};
        margin-top: 2.5px;
        &:hover{
            box-shadow: 5px 7.5px 10px $shadow-gray;
            margin-top: 0px;
            margin-bottom: 2.5px;
        }
        &.add{
            margin-top: 5em;
            padding: 1em 1.4em;
            border-radius: 1em;
            font-size: 1em;
            // background-color: lavender;
            margin-bottom: 10em;
        }
        &.medium{
            font-size: 1em;
        }
        &.small{
            font-size: .8em;
            padding: .3em .6em;
            border-radius: 2em;
            margin-left: .5em;
        }
    `
    
export const Header = styled.header`${headerStyle}`
export const Container = styled.div`${containerStyle}`
export const Button = styled.button({
    fontSize: "inherit",
    padding: ".4em .8em",
    backgroundColor: "white",
    border: "1.5px solid lightgray",
    boxShadow: "!5px 5px 10px $shadow-gray",
    borderRadius: ".8em",
    fontFamily: "$font-2",
    cursor: "pointer",
    transition: "all .2s ease",
    marginTop: "2.5px",
    "&:hover":{
        boxShadow: "5px 7.5px 10px $shadow-gray",
        marginTop: "0px",
        marginBottom: "2.5px",
    },
    "&.add":{
        marginTop: "5em",
        padding: "1em 1.4em",
        borderRadius: "1em",
        fontSize: "1em",
        // background-color: lavender,
        marginBottom: "10em",
    },
    "&.medium":{
        fontSize: "1em",
    },
    "&.small":{
        fontSize: ".8em",
        padding: ".3em .6em",
        borderRadius: "2em",
        marginLeft: ".5em",
    }
});