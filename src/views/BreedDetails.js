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
        setLoading(true)
        setError(false)
        axios.get(`https://api.thecatapi.com/v1/images/${params.imageId}`)
            .then(({ data }) => {
                setBreedDetails({ ...data, ...data.breeds[0] })
            })
            .catch(() =>
                setError(true)
            )
            .finally(() => {
                setLoading(false)
            })
    }, [params.imageId])

    const handleOnBack = () => {
        navigate(-1)
    }

    return (
        <Container>
            <Button onClick={handleOnBack} style={{margin: '10px 0'}}>Back</Button>
            <Card>
                {
                    loading &&
                    <Card.Body>
                        Loading Cat Details...
                    </Card.Body>
                }
                {
                    error &&
                    <Card.Body>
                        Apologies but we could not load cat details for you at this time! Miau!
                    </Card.Body>
                }
                {
                    !error && breedDetails &&
                    <>
                        <Card.Img variant="top" src={breedDetails.url} />
                        <Card.Body>
                            <h3>{breedDetails.name}</h3>
                            <h4>Origin: {breedDetails.origin}</h4>
                            <strong>{breedDetails.temperament}</strong>
                            <p>{breedDetails.description}</p>
                        </Card.Body>
                    </>
                }
            </Card>
        </Container>
    )
}

export default BreedDetails