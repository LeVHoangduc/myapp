import React, { useEffect } from 'react'
import API from '../API/API'
import FormError from './FormError';
import { useNavigate, useParams } from 'react-router';
export default function EditProduct() {
    const navigate = useNavigate();
    const [getInput, setGetInput] = React.useState({
        name: '',
        price: '',
        category: '',
        brand: '',
        company: '',
        detail: '',
        status: '',
        sale: ''
    });
    function handleChange(e) {
        const { name, value } = e.target;
        setGetInput(state => {
            return {
                ...state,
                [name]: value
            }
        })
    }
    const [getFiles, setFiles] = React.useState([]);
    function handleChangeImage(e) {
        const name = e.target.name;
        const files = e.target.files;
        setFiles(state => {
            return {
                ...state,
                [name]: files
            }
        })
    }
    const token = localStorage.getItem('token');
    const config = React.useMemo(() => ({
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }), [token]);
    let productID = useParams().id;
    const [getImages, setImages] = React.useState([]);
    useEffect(() => {
        API.get('/user/product/' + productID, config)
            .then(response => {
                setGetInput(response.data.data);
                setImages(response.data.data.image);
            })
            .catch(error => {
                console.log(error)
            })
    }, [config, productID]);
    const [categories, setCategories] = React.useState([])
    const [brands, setBrands] = React.useState([])
    useEffect(() => {
        API.get('/category-brand')
            .then(response => {
                setCategories(response.data.category)
                setBrands(response.data.brand)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);
    function fetchCategory() {
        return categories.map((value, index) => {
            return (
                value.id === getInput.id_category ? <option key={index} value={value.id} selected>{value.category}</option> : <option key={index} value={value.id}>{value.category}</option>
            )
        })
    };
    function fetchBrand() {
        return brands.map((value, index) => {
            return (
                value.id === getInput.id_brand ? <option key={index} value={value.id} selected>{value.brand}</option> : <option key={index} value={value.id}>{value.brand}</option>
            )
        })
    };
    function fetchStatus() {
        const isSelected = getInput.status === 0;
        return (
            <select className="form-select" name='status' onChange={handleChange}>
                <option value="0" selected={isSelected}>New</option>
                <option value="1" selected={!isSelected}>Sale</option>
            </select>
        );
    }
    const [getError, setError] = React.useState("");
    function handleSubmit(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if (getInput.name === '') {
            errorSubmit.name = 'Name is required!';
            flag = false;
        }
        if (getInput.price === '') {
            errorSubmit.price = 'Price is required!';
            flag = false;
        }
        if (getInput.category === '') {
            errorSubmit.category = 'Category is required!';
            flag = false;
        }
        if (getInput.brand === '') {
            errorSubmit.brand = 'Brand is required!';
            flag = false;
        }
        if (getInput.company === '') {
            errorSubmit.company = 'Company is required!';
            flag = false;
        }
        if (getInput.detail === '') {
            errorSubmit.detail = 'Detail is required!';
            flag = false;
        }
        if (getInput.status === '') {
            errorSubmit.status = 'Status is required!';
            flag = false;
        }
        if (getFiles.length === 0) {
            errorSubmit.files = 'File is required!';
            flag = false;
        } else {
            const typeFile = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'];
            if (getFiles.files) {
                Object.keys(getFiles.files).forEach((key) => {
                    if (typeFile.indexOf(getFiles.files[key].type) === -1) {
                        errorSubmit.files = 'File is not valid!';
                        flag = false;
                    }
                    else if (getFiles.files[key].size > 1024 * 1024) {
                        errorSubmit.files = 'File is too large!';
                        flag = false;
                    }
                });
                if (Object.keys(getFiles.files).length > 3) {
                    errorSubmit.files = 'Maximun 3 files!';
                    flag = false;
                }
            }
        }
        const totalImages = getImages.length + Object.keys(getFiles.files).length - selectedImages.length;
        if (totalImages > 3) {
            errorSubmit.files = 'Maximun 3 files!';
            flag = false;
        }
        if (!flag) {
            setError(errorSubmit);
        }
        else {
            let formData = new FormData();
            formData.append('name', getInput.name);
            formData.append('price', getInput.price);
            formData.append('category', getInput.id_category ? getInput.id_category : getInput.category);
            formData.append('brand', getInput.id_brand ? getInput.id_brand : getInput.brand);
            formData.append('company', getInput.company_profile ? getInput.company_profile : getInput.company);
            formData.append('detail', getInput.detail);
            formData.append('status', getInput.status);
            formData.append('sale', getInput.sale);
            Object.keys(getFiles.files).forEach((key) => {
                formData.append('file[]', getFiles.files[key]);
            });
            selectedImages.forEach((value) => {
                formData.append('avatarCheckBox[]', value);
            });
            let url = '/user/product/update/' + productID;
            let accessToken = localStorage.getItem('token');
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            }
            API.post(url, formData, config)
                .then(res => {
                    if (res.data.errors) {
                        setError(res.data.errors);
                    }
                    else {
                        navigate('/account/my-product');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
    function fetchImages() {
        if (getImages) {
            return getImages.map((value, index) => {
                return (
                    <div key={index} style={{ width: '100px', height: '100px', margin: '0px 5px 10px 0px' }}>
                        <img key={index} src={require('./img/' + extractFilename(value))} alt="" style={{ width: '100px', height: '100px', marginRight: '10px', border: '1px solid #fe980f' }} />
                        <input type="checkbox" name="deleteImage" value={value} onChange={(e) => handleDeleteImageCheckBox(e, value)} />
                    </div>
                )
            })
        }
    }
    function extractFilename(inputString) {
        const parts = inputString.split('_');
        if (parts.length === 2) {
            return parts[1];
        } else {
            return inputString;
        }
    }
    const [selectedImages, setSelectedImages] = React.useState([]);
    function handleDeleteImageCheckBox(e, imageFileName) {
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedImages((prevSelectedImages) => [...prevSelectedImages, imageFileName]);
        } else {
            setSelectedImages((prevSelectedImages) => prevSelectedImages.filter((fileName) => fileName !== imageFileName));
        }
    }
    return (
        <div className="col-sm-5 col-sm-offset-1">
            <div className="signup-form">
                <h2>Edit Product</h2>
                <form encType="multipart/form-data" method='post' onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Product Name" onChange={handleChange} value={getInput.name} />
                    <input type="number" name="price" placeholder="Product Price" onChange={handleChange} value={getInput.price} />
                    <select className="form-select" name='category' onChange={handleChange}>
                        {fetchCategory()}
                    </select>
                    <select className="form-select" name="brand" onChange={handleChange}>
                        {fetchBrand()}
                    </select>
                    {fetchStatus()}
                    <input type="number" name="sale" placeholder="Sale (%)" onChange={handleChange} value={getInput.sale} />
                    <input type="text" name="company" placeholder="Company" onChange={handleChange} value={getInput.company_profile} />
                    <input type="file" name='files' onChange={handleChangeImage} multiple />
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '50px' }}>
                        {fetchImages()}
                    </div>
                    <textarea name="detail" placeholder="Description" onChange={handleChange} value={getInput.detail}></textarea>
                    <button type="submit" className="btn btn-default">Update Product</button>
                </form>
                <FormError error={getError} />
            </div>
        </div>
    )
}
