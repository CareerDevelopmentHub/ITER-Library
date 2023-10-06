import './bookcard.css'
const BookCard = (props) => {

    const downloadWork = (url, id) => {
        window.open(url, "_blank");
        localStorage.setItem(`d_id_${id}`, "");

    }
    return (
        <div className='bookCardHolder'>
            <div className='bookSl'>{props.sl}</div>
            {
                localStorage.getItem(`d_id_${props.id}`) === "" ? <div title={'File already downloaded'} className='bookSl downloaded'>✅</div> : null
            }

            <br></br>
            <div title='Title of file' className='bookName'>{props.title}</div>
            <div className='o_details'>
                <i title='Subject' className="sub_name">{props.sub}</i>
                <div className='book_tags'>
                    {
                        props.tags.map((d, i) => {
                            return <i title='More details' key={i} className="more_details">{d}</i>
                        })
                    }

                </div>

            </div>
            <div className="bookD_btn">
                {
                    props.v_link === "" ? <button title='No view link found' style={{cursor:"not-allowed"}}>🚫</button> : <button title='View the file' onClick={() => downloadWork(props.v_link, 0)}>VIEW</button>
                }

                {
                    props.url === "" ? <button title='No download link found' style={{cursor:"not-allowed"}}>🚫</button> : <button title='Download the file' onClick={() => downloadWork(props.url, props.id)}>DOWNLOAD</button>
                }
                
                
            </div>
        </div>
    );
}

export default BookCard;
