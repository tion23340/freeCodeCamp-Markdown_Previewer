import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css'
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faMaximize, faEye } from '@fortawesome/free-solid-svg-icons';

const root = ReactDOM.createRoot(document.getElementById('root'));


// Componenta editor trebuia sa aiba id='editor', va contine input-ul de la user (partea unde scrii textul).
class Editor extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      input: '# Welcome to my React Markdown Previewer!\n##  H2 \n[desene animate pentru copii](https://pornhub.com)\n`This is a inline code`\n```\n//This is a multiline code\n```\n> Block Quotes!\n- list item\n- ghhj\n- hkj\n\n**Kirovets K-701**\n\n![me](https://www.retrade.eu/i/object/2771727-IMG_2376.JPG/Kirovets_K701_traktor___Tractor.jpg)\n'
    }
    this.handleChange = this.handleChange.bind(this);
    this.setVisibility = this.setVisibility.bind(this);
    this.setVisibilityPreviewer = this.setVisibilityPreviewer.bind(this);
  }

  handleChange(e){
    this.setState({
      input: e.target.value,
      visible: true,
    })
  }



  setVisibility(){
    this.setState((state) => {
      return {
        visible: !state.visible,
      }
    })
  }

  setVisibilityEditor(){
    if(!this.state.visible)
      return {
        width: "100%",
        height: "450px",
      }
    else return {
      width: "50%",
      height: "250px",
    }
  }


  setVisibilityPreviewer(){
    if(this.state.visible) 
      return {
        position: "relative",
        opacity: 1,
      }
    else return {
      position: "absolute",
      opacity: 0
    };
  }

  render(){
    
    return (
      <div>
        <div className='editor-container' style={this.setVisibilityEditor()}>
          <p><span><FontAwesomeIcon icon={faPen} /> Editor</span> <button onClick={this.setVisibility} className='full-screen'><FontAwesomeIcon icon={faMaximize} /></button></p>
          <textarea id='editor' onChange={this.handleChange}>
            {this.state.input}
          </textarea> 
        </div>
        <div className='previewer-container' style={this.setVisibilityPreviewer()}>
          <Previewer visibility={this.state.visible} input={this.state.input}/>
        </div> 
      </div>
    )
  }

}

//Componenta Previewer - ia input-ul de la editor ca props, pe urma il 'traduce' si afiseaza textul tradus.

class Previewer extends React.Component {
  constructor(props){
    super(props);

  } 

  render(){
    return (
      <div id='preview' className='text-container'>
        <p><span><FontAwesomeIcon icon={faEye} /> Previewer</span> <button className='full-screen'><FontAwesomeIcon icon={faMaximize} /></button></p>
        <ReactMarkdown>{this.props.input}</ReactMarkdown>
      </div>
    )
  }
}

//Render part
root.render(<Editor />)

