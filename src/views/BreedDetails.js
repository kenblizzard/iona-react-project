import axios from "axios"
import { useEffect, useState } from "react"
import { Card, Container, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

const BreedDetails = () => {

    const [breedDetails, setBreedDetails] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://api.thecatapi.com/v1/images/${params.imageId}`)
            .then(({ data }) => {
                setBreedDetails({ ...data, ...data.breeds[0] })
            })


    }, [params.imageId])

    const handleOnBack = () => {
        navigate(-1)
    }

    return (
        <Container>
            <Button onClick={handleOnBack}>Back</Button>
            <Card>
                {
                    breedDetails &&
                    <>
                        <Card.Img variant="top" src={breedDetails.url} />
                        <Card.Body>
                            <h2>{breedDetails.name}</h2>
                            <h3>Origin: {breedDetails.origin}</h3>
                            <h3>{breedDetails.temperament}</h3>
                            <p>{breedDetails.description}</p>
                        </Card.Body>
                    </>
                }
            </Card>
        </Container>
    ) 
}

export default BreedDetails