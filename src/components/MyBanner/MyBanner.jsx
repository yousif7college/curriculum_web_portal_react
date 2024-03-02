import "./MyBanner.scss"

export default function MyBanner({ title, img, icon }) {
    console.log("dddd", img)
    return (
        <div className='MyBanner' style={{ backgroundImage: `url(${img})` }}>
            <div className="shade">
                <h1>{icon}{title}</h1>
            </div>
        </div>
    )
}
