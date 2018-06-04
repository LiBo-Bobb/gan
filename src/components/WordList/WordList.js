import React, {Component} from 'react';
import {Link} from 'react-router';
import './WordList.css';
import BishunPlayer from '../BishunPlayer/BishunPlayer'


export default class WordList extends Component {
    constructor(props) {
        super(props)
        //获取书的索引
        let {presspinyin, bookId, wordId} = props.params;
        //获取当前书的数据
        this.currentBookData = window.AllBooksForPress.filter(m => m.presspinyin === presspinyin)[0]["books"][bookId];
        let {book_data: {lesson}} = this.currentBookData;
        // console.log(this.courseData)
        this.state = {
            //显示de汉字
            currentWord: '',
            //当前汉字的数组
            currentWords: lesson[wordId].words,
        }
    }


    handleOnBishunPlayerClosed = () => {
        this.setState({currentWord: ''})
    }


    canvasSupportError = () => {
        console.log('canvas not support')
    }

    //卸载书本组件
    componentWillUnmount() {
        // console.log('卸载书本组卷........')
    }


    //点击某个汉字 ，将亲北京色变为灰色
    handleClickWord = (word) => {
        let {book_data: {lesson}} = this.currentBookData;
        let {wordId} = this.props.params;
        let tmpWords = lesson[wordId].words;
        // console.log("tmpWords.....", tmpWords)
        for (let i of tmpWords) {
            if (i.word === word) {
                i.isReaded = true;
            }
        }

        this.setState({currentWords: tmpWords})


    }

    render() {

        let {currentWord, currentWords} = this.state;
        //分别为书本的索引和课时的索引
        let {presspinyin, bookId,} = this.props.params;


        return (
            <div className="TextBoxArea">
                {!currentWord &&
                <Link to={`/press/${presspinyin}/book/${bookId}`}>
                    <div className="go_back">
                        <span
                            style={{width: "100%", marginRight: "10px", lineHeight: "100%"}}>
                        <img src="https://img.gankao.com/market/indexImg/1528078756956.PNG" alt=""/>
                        </span>
                        返回目录
                    </div>
                </Link>
                }
                {currentWord &&
                <BishunPlayer
                    key={'bishunplayer_' + this.state.currentWord}
                    onBishunPlayerClosed={this.handleOnBishunPlayerClosed}
                    word={currentWord}
                />
                }
                <div className="WordList" style={{top: currentWord ? "336px" : "75px"}}>
                    {currentWord &&
                    <div style={{height: "1px", backgroundColor: "rgb(245,245,245)", marginBottom: "30px"}}></div>}

                    {currentWords && currentWords.map((item, index) => {
                        return <div
                            onClick={() => {
                                this.handleClickWord(item.word)
                                this.setState({currentWord: item.word})
                            }}
                            className="textItemBox"
                            key={"lesson" + index}>
                            <div style={{opacity: item.isReaded ? ".6" : ""}} className="textItem">
                                {item.word}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        )
    }
}