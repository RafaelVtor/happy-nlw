import Orphanage from '../models/Orphanage';
import imagesView from './images_view'

export default{

    render(orphanage:Orphanage){
        const {
            id,
            name,
            latitude,
            longitude,
            about,
            instructions,
            list_of_donations,
            opening_hours,
            open_on_weekends,
            images
        } = orphanage

        return{
            id: id,
            name: name,
            latitude: latitude,
            longitude: longitude,
            about: about,
            instructions:instructions,
            list_of_donations: list_of_donations,
            opening_hours: opening_hours,
            open_on_weekends: open_on_weekends,
            images: imagesView.renderMany(images)
        };
    },

    renderMany(orphanages:Orphanage[]){
        return orphanages.map(orphanage =>this.render(orphanage))
    }
}