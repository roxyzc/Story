import moment from "moment";
 
export const formatDate = (date, format) => {
    return moment(date).format(format);
}

export const truncate = (str, len) => {
    if(str.length > len && str.length > 0){
        let new_str = str + " ";
        // console.log(`str pertama: ${new_str}`);
        new_str = str.substr(0, len);
        // console.log(`str kedua: ${new_str}`);
        new_str = str.substr(0, new_str.lastIndexOf(" "));
        // console.log(`str ketiga: ${new_str}`);
        new_str = new_str.length > 0 ? new_str : str.substr(0, len);
        // console.log(`str keempat: ${new_str}`);
        return new_str + "...";
    }
    return str;
}

export const stripTags = (input) =>{
    return input.replace(/<(?:.|\n)*?>/gm, "");
}

export const editIcon = (storyUser, loggedUser, storyId, floating = true) =>{
    // console.log(storyUser);
    // console.log(loggedUser);
    if(storyUser._id.toString() == loggedUser._id.toString()){
        console.log(storyUser);
        if(floating){
            return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
        }else{
            return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
        }
    }else{
        return ""
    }
}  