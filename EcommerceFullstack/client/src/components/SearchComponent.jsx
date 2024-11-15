import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { hideLoading, showLoading } from "../store/functionalitySlice"
import { toast } from "react-toastify"

export const SearchComponent = () => {

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [filteredData, setFilteredData] = useState([])

    const getProducts = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}product/search/${params.query}`)
            setFilteredData(response.data)
        } catch (error) {
            toast.error('some error occured')
        } finally {
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        getProducts()
    }, [params.query])

    if (filteredData.length === 0) {
        return (
            <h1 className="py-5 text-center">No Such Products...</h1>
        )
    }

    return (

        <>
            <h3 className="sm:pl-10 pt-5">Showing {filteredData.length} matched Products...</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full sm:w-4/5 mx-auto my-4 p-2">
                {filteredData?.map(product => {
                    return (

                        <div key={product._id}
                            onClick={() => {
                                navigate(`/products/${product._id}`)
                            }}
                            className="shadow-md overflow-hidden bg-white rounded-md relative cursor-pointer border flex flex-col justify-between">
                            {/* <p className="absolute top-0 right-0 bg-blue-600 text-white p-1 rounded-full z-10">{product.rating.rate}</p> */}
                            <div className="w-full h-3/4 overflow-hidden p-2">
                                <img className="object-contain w-full h-full hover:scale-110 cursor-pointer" src={product.images[0]} alt="" />
                            </div>

                            <div>
                                <p className="px-2 font-mono whitespace-nowrap">{product.name}</p>
                                {/* <p className="px-2 font-mono whitespace-nowrap">{product.title.split(' ').slice(0, 3).join(' ')}</p> */}
                                {/* <p className="px-2 font-mono whitespace-nowrap">{product.title}</p> */}
                                <p className="text-right px-2 pb-2 text-yellow-600">Rs.{product.price}/-</p>
                            </div>
                        </div>

                    )
                })}

            </div>
        </>
    )
}


