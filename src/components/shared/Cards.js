import React, { useEffect, useRef, useState } from 'react';
import logoImg from "../../img/svg/noImgLogo.svg";
import starImg from "../../img/svg/star.svg";
import kebabImg from '../../img/svg/kebab.svg';
import mobileAddImg from '../../img/svg/mobileAdd.svg';
import { getTimeDiff } from '../../utils/postTime';


/* 각 카드 컴포넌트 */
function CardItem({item, prevKey, setPrevKey}) {
    const [iscebabClick, setIscebabClick] = useState(false);
    const handleCebabClick = (event) => {
        event.preventDefault();
        setPrevKey(item.id);
        setIscebabClick(!iscebabClick);
    }
    
    const handleListClick = (event) => {
        event.preventDefault();
    }
    const imgStyle = {
        'backgroundImage': `URL(${item.image_source})`,
    }
    const nowDate = getTimeDiff(new Date(item.created_at));

    return (
        <div className='card'>
            <div className="card-img-wrap">
                {!item.image_source ? <img className="logo-img" src={logoImg} alt='로고이미지'/> :
                <div className='card-img' style={imgStyle}></div>}
                <img className="star-img" src={starImg} alt='별모양 버튼'/>
            </div>
            <div className='card-inpormation'>
                <div className='card-inpormation-first-line'>
                    <div className='time'>{nowDate}</div>
                    <img className='Kebab-botton'  src={kebabImg} alt='케밥이미지' onClick={(event) => handleCebabClick(event)}/>
                </div>
                <p>{item.description ? item.description : "데이터가 없습니다"}</p>
                <div className='day'>{item.created_at.split("T")[0]}</div> 
                <ul className='folder-botton' style={{display: prevKey === item.id ? iscebabClick ? "flex" : "none" : "none"}} >
                    <li onClick={(event)=>{handleListClick(event)}}>삭제하기</li>
                    <li onClick={(event)=>{handleListClick(event)}}>폴더에 추가</li>
                </ul>
                <h4><span>폴더 추가</span><img src={mobileAddImg} alt="추가이미지"/></h4>
            </div>  
        </div>
    
    )
}

const Cards = ({personalfolder}) => {
    const [prevKey, setPrevKey] = useState(null);
    return (
        <div className="section-title section-title-third">
            <div className='section-title-third-inner'>
                {personalfolder && personalfolder.map(item =>(
                    <a key={item.id} href={item.url} target='_blank'>
                        <CardItem item={item} prevKey={prevKey} setPrevKey={setPrevKey}/>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Cards;