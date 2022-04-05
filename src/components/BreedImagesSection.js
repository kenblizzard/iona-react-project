import axios from "axios"
import { useEffect, useState } from "react"
import { Card, Col, Row, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const BreedImagesSection = ({ breedId }) => {

    const [selectedBreed, setSelectedBreed] = useState(null)
    const [breedImages, setBreedImages] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [loadMore, setLoadMore] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        getBreedImages()
    }, [breedId])

    const getBreedImages = () => {
        if (!breedId) {
            setBreedImages([])
            setLoadMore(false)
            return
        }
        setLoading(true)
        setError(false)
        setSelectedBreed(breedId)
        axios.get('https://api.thecatapi.com/v1/images/search',
            {
                params: {
                    breed_id: breedId,
                    page: breedId === selectedBreed ? pageNumber : 1,
                    limit: 10
                }
            })
            .then(({ data }) => {
                if (breedId === selectedBreed) {
                    setBreedImages([...breedImages, ...data])
                } else {
                    setBreedImages(data)
                    setPageNumber(1)
                }
                if (data.length >= 10) {
                    setLoadMore(true)
                    setPageNumber(pageNumber + 1)
                } else {
                    setLoadMore(false)
                }
            })
            .catch(() => {
                setError(true)
                setLoadMore(false)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleClickCatDetails = (id) => {
        navigate(`/breed/${id}`)
    }

    return (
        <>
            <Row>
                {
                    (!breedImages || breedImages.length <= 0) &&
                    <h4>Please select a breed to show images.</h4>
                }
                {
                    breedImages && breedImages.map(({ url, id }) =>
                        <Col lg={3} md={4} xs={6} style={{ margin: '10px 0' }}>
                            <Card>
                                <Card.Img variant="top" src={url} />
                                <Card.Body>
                                    <div className="d-grid">
                                        <Button
                                            variant="primary"
                                            onClick={() => handleClickCatDetails(id)}
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }
            </Row>
            {
                error &&
                <Row>
                    <Col style={{ margin: '10px 0' }}>
                        <Alert variant="danger">
                            Apologies but we could not load new cats for you at this time! Miau!
                        </Alert>
                    </Col>
                </Row>
            }
            {
                loadMore &&
                <Row>
                    <Col lg={4}>
                        <Button
                            variant="info"
                            onClick={getBreedImages}
                            disabled={loading}
                        >
                            {
                                loading ?
                                    'Loading Cats...' :
                                    'Load More'
                            }
                        </Button>
                    </Col>
                </Row>
            }
        </>
    )

}

export default BreedImagesSection