import React, {Component} from 'react';
import {Link,IndexLink} from 'react-router';
import './SingleBook.css';
//计算汉字的总数
// const wordCounts = lesson.reduce((pre, next) => pre + next['words'].length, 0) || 0;
export default class SingleBook extends Component {
    constructor(props) {
        super(props);
        //课本索引
        let {bookId} = this.props.params;
        //获取当前书本的信息
        this.courseData = window.bookData[bookId];
        this.state = {
        }
    };

    componentDidMount() {

    }

    /**
     * 根据订单id获取订单详细数据
     * @param  {[number]} id [订单ID]
     * @return {[order]}    [订单详细信息]
     */

    getWordsCounts = () => {


    }

    render() {
        let {book_data: {courseName, courseDesc, courseBanner, lessonIcon, textBackImg, lesson,}} = this.courseData;
        let {bookId} = this.props.params
        return (<div className="App">
            {this.props.children && this.props.children}
            {!this.props.children && <div>
                {/*头部banner信息start*/}
                <IndexLink to="/" className="goIndexPage">
                    返回
                </IndexLink>
                <div className="courseTitleArea">
                    <div className="leftCourseImg">
                        <img style={{height: "150px"}} src={courseBanner} alt=""/>
                    </div>
                    <div className="rightTextDesc">
                        <h1 style={{fontSize: "17px", color: "#000000"}}>{courseName}</h1>
                        <div style={{color: "#B4B4B4", fontSize: "14px", marginTop: "10px",}}>2222</div>
                        <div
                            style={{
                                color: "#B4B4B4",
                                fontSize: "12px",
                                marginTop: "20px"
                            }}>
                            {courseDesc}
                        </div>
                    </div>
                </div>
                {/*http://p8ej3yb7v.bkt.clouddn.com//%25E4%25B8%2581/pinyin0.mp3*/}
                {/*  <audio controls src="../../audio/弯折.mp3">
                    您的浏览器不支持 audio 标签。
                </audio>*/}
                {/*头部banner信息end*/}
                <div className="catalogList">
                    {/*目录列表start*/}
                    {lesson.map((item, index) => {
                        return <Link to={`/book-item/${bookId}/text-list/${index}`} key={"course" + index}>
                            <div className="catalogItem">
                                <div className="imgIcon"
                                     style={{marginRight: "20px", width: "35px", lineHeight: "100%"}}>
                                    <img style={{width: "100%"}} src={lessonIcon} alt=""/>
                                </div>
                                <div className="textBox">
                                    <div style={{color: "#000000", fontSize: "14px"}}>{item.name}</div>
                                    <div style={{color: "#969696", fontSize: "12px"}}>
                                        {item.words.length}个字
                                    </div>
                                </div>
                            </div>
                        </Link>
                    })}
                </div>
                {/*目录列表end*/}


            </div>}


        </div>);
    }
}
