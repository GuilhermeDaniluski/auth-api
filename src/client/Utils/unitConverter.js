const unitConverter = (data) => {
    if (isNaN(data)) return null;
    let sizeInMB = data / 1024 / 1024
    return sizeInMB > (1024*20) ? (sizeInMB / 1024).toFixed(2) + " GB" : sizeInMB.toFixed(0) + " MB"
}

export default unitConverter