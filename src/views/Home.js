import axios from "axios"
import { useEffect, useState } from "react"
import { Alert, Container, Form, Row, } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import BreedImagesSection from "../components/BreedImagesSection"

const HomePage = () => {
    const [breeds, setBreeds] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        setLoading(true)
        setError(false)
        axios.get('https://api.thecatapi.com/v1/breeds')
            .then(({ data }) => {
                setBreeds(data)
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [])

    const handleChangelSelectedBreed = (e) => {
        navigate(`/${e.target.value}`)
    }

    return (
        <Container>
            <Row>
                <h1>Cat Browser</h1>
            </Row>
            {
                error &&
                <Alert variant="danger">Apologies but we could not load cat browser for you at this time! Miau!</Alert>
            }
            {
                loading &&
                <p>Loading Cat Browser...</p>
            }
            {
                !error && !loading &&
                <>
                    <Row>
                        <Form.Label htmlFor="selectBreed">Breed</Form.Label>
                        <Form.Select
                            id="selectBreed"
                            onChange={handleChangelSelectedBreed}
                        >
                            <option value="" selected={!params.breedId ? 'selected' : ''}>Select Breed</option>
                            {
                                breeds && breeds.map((breed, index) =>
                                    <option value={breed.id} selected={breed.id === params.breedId ? 'selected' : ''} key={`breed-${index}`}>{breed.name}</option>
                                )
                            }
                        </Form.Select>
                    </Row>
                    <BreedImagesSection breedId={params.breedId} />
                </>
            }
        </Container>

    )
}

export default HomePage