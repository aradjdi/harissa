export default function loaderSrv() {
    this.isRequesting = false;

    this.showLoader = () => {
        this.isRequesting = true;
    };

    this.hideLoader = () => {
        this.isRequesting = false;
    };

    return this;
}
