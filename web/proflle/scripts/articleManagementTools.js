$("#add-article-btn").click(function () {
    $("#article-management-box").addClass('d-none')
    $("#adding-form-box").removeClass('d-none')
})
$("#turn-back").click(function () {
    $("#adding-form-box").addClass('d-none')
    $("#article-management-box").removeClass('d-none')
})

function editArticle(element) {
    $(element).parent().parent().next().toggleClass('d-none')
}

function deleteArticle(element) {
    /**
     * @AJAX - request for deleting chosen article
     * @param id - article identifier
     */
}

let canSubmitEdit = true
let canSubmitAdd = true
function processTitle(element , type , action) {
    let res = validate_title(element)
    if (!res.valid) {
        $(element).parent().addClass('valid-dec')
        $(element).parent().attr('about' , res.error)
        if (res.error.includes('empty') && action === 'change') {
            $(element).parent().attr('about' , '')
            $(element).parent().removeClass('valid-dec')
        }
        if (type === 'add') {
            canSubmitAdd = false
        }
        if (type === 'edit') {
            canSubmitEdit = false
        }
    }
    else {
        $(element).parent().attr('about' , '')
        $(element).parent().removeClass('valid-dec')
    }
    return res
}
function processContent(element , type , action) {
    let res = validate_content(element)
    if (!res.valid) {
        $(element).parent().addClass('valid-dec')
        $(element).parent().attr('about' , res.error)
        if (res.error.includes('empty') && action === 'change') {
            $(element).parent().attr('about' , '')
            $(element).parent().removeClass('valid-dec')
        }
        if (type === 'add') {
            canSubmitAdd = false
        }
        if (type === 'edit') {
            canSubmitEdit = false
        }
    }
    else {
        $(element).parent().removeClass('valid-dec')
        $(element).parent().attr('about' , '')
    }
    return res
}
function addFile(element , type , action) {
    if (!validate_files(element)) {
        $(element).parent().addClass('valid-dec')
        $(element).parent().attr('about' , 'Max size for each file is 10MB')
        if (type === 'add') {
            canSubmitAdd = false
        }
        if (type === 'edit') {
            canSubmitEdit = false
        }
    }
    else {
        $(element).parent().removeClass('valid-dec')
        $(element).parent().attr('about' , '')
    }
}
function dropFile(element) {
    let deletingFile = $(element).prev()
    /**
     * @AJAX - request on deleting chosen media from article
     * @param id - id of deleting media
     */
    $(element).parent().remove()
}
function previewFile(element) {
    window.open('/api/resource/' + $(element).val() , '_blank')
}
function submitAdd(element) {
    let form = $(element).parent().parent()[0]
    let formData = new FormData(form)
    let count = 0
    $(form).children().each(function () {
        if (count === 0) {
            processTitle($(this).children().eq(0) , 'add' , 'submit')
        }
        if (count === 1) {
            processContent($(this).children().eq(0) , 'add' , 'submit')
        }
        if (count === 2) {
            addFile($(this).children().eq(0) , 'add' , 'submit')
        }
        count++;
    })
    if (canSubmitAdd) {
        /**
         * @AJAX - request on editing
         */
        $("#add-art-sec-title").attr('about' , 'RESPONSE_STATUS')
        setTimeout(function () {$("#add-art-sec-title").attr('about' , '')} , 3000)
    }
    else {

    }
}
function submitEdit(element) {
    let form = $(element).parent().parent()[0]
    let formData = new FormData(form)
    let count = 0
    $(form).children().each(function () {
        if (count === 0) {
            processTitle($(this).children().eq(0) , 'edit' , 'submit')
        }
        if (count === 1) {
            processContent($(this).children().eq(0) , 'edit' , 'submit')
        }
        if (count === 2) {
            addFile($(this).children().eq(0) , 'edit' , 'submit')
        }
        count++;
    })
    if (canSubmitEdit) {
        /**
         * @AJAX - request on editing
         */
        $(element).parent().parent().parent().children().eq(0).attr('about' , 'RESPONSE_STATUS')
        setTimeout(function () {$(element).parent().parent().parent().children().eq(0).attr('about' , '')} , 3000)
    }
}