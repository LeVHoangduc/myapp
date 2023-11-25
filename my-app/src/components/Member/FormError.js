function FormError(props) {
    function render() {
        let { error } = props;
        if(Object.keys(error).length > 0) {
            return Object.keys(error).map((key, index) => {
                return (
                    <p key={index} style={{color: "red"}}>{error[key]}</p>
                )
            })
        }
    }
    return (
        <div>
            {render()}
        </div>
    )
}
export default FormError;