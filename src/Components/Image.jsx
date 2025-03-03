import React from 'react'
import phone from '../images/jk.jpg'
import girl from '../images/girls.jpg.png'

function Image() {
    return (
        <div>
            <img className='background_img' src={phone} />
            <div className="text">
                <p>
                    <img className='img' src={girl} />
                </p>
                <p className='font-text'>
                    <h3>Digital | Phone Directory </h3>
                    <b>The Evolution of Phone Directories: </b>Embracing the Digital Age
                    In today's fast-paced digital world, traditional phone directories
                    have become a relic of the past. The internet has revolutionized the
                    way we access information, and phone directories are no exception. A
                    digital phone directory is a modern and efficient way to store and
                    retrieve phone numbers, making it an essential tool for individuals
                    and businesses alike.
                    <br /><br />
                    <b>The Benefits of a Digital Phone Directory :</b>A digital phone
                    directory offers numerous benefits over its traditional counterpart.
                    Firstly, it is easily accessible from anywhere with an internet
                    connection, eliminating the need for physical storage space.
                    Additionally, digital phone directories can be easily updated and
                    maintained, ensuring that the information is always up-to-date and
                    accurate. Furthermore, digital phone directories can be searched
                    quickly and efficiently, saving users valuable time and effort.
                    <br /><br />
                    <b> Features of a Digital Phone Directory</b> A digital phone
                    directory can include a range of features that enhance its
                    functionality and user experience. These may include:
                    <li>
                        {" "}
                        Advanced search functionality, allowing users to search by name,
                        phone number, or category
                    </li>{" "}
                    <li>
                        Filtering and sorting options, enabling users to narrow down their
                        search results
                    </li>
                    <li>
                        {" "}
                        User reviews and ratings, providing valuable feedback on listed
                        businesses and services
                    </li>
                    <li>
                        {" "}
                        Integration with mapping services, allowing users to easily locate
                        listed businesses
                    </li>
                    <li>
                        {" "}
                        Mobile optimization, ensuring that the directory is accessible
                        on-the-go
                    </li>
                </p>
            </div>
        </div>
    )
}

export default Image