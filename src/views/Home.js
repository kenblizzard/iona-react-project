import axios from "axios"
import { useEffect, useState } from "react"
import { Container, Form, Row, } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import BreedImagesSection from "../components/BreedImagesSection"

const HomePage = () => {
    const [breeds, setBreeds] = useState([])
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        axios.get('https://api.thecatapi.com/v1/breeds')
            .then(({ data }) => {
                console.log(data)
                setBreeds(data)
            })
    }, [])

    const handleChangelSelectedBreed = (e) => {
        navigate(`/${e.target.value}`)
    }
    return (
        <Container>
            <Row>
                <h1>Cat Browser</h1>
            </Row>
            <Row>
                <Form.Select
                    onChange={handleChangelSelectedBreed}
                >
                    {
                        breeds && breeds.map((breed) =>
                            <option value={breed.id} selected={breed.id === params.breedId ? 'selected' : ''}>{breed.name}</option>
                        )
                    }
                </Form.Select>
            </Row>
            <BreedImagesSection breedId={params.breedId} />
        </Container>
    )
}

export default HomePage