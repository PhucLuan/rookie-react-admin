import React, { useState } from 'react'

const Thumb = ({ imageFile, initimageSrc }) => {
    
    const [imageSrc, setimageSrc] = useState(initimageSrc);

    if (imageFile !== null) {
        const reader = new FileReader();

        reader.onload = x => {

            setimageSrc(x.target.result);
        }
        reader.readAsDataURL(imageFile);

    }
    // else
    //     setimageSrc("/avatars/3.jpg")

    return (
        <div>
            <img src={imageFile !== null ? imageSrc : "/avatars/defaultImage.jpg"} alt="Ahihi"
                height={200}
                width={200} />
        </div>
    )
}

export default Thumb
