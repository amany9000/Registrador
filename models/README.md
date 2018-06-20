# Models

## classes
* user ( user details )
* land ( land details )
* transaction ( land deal details )

### user
* class
    + confirms the model is of user class
* id
    + id of the user ( and its public key )
* currentAssets
    + array of ids of the current land assets with the person
* previousAssets
    + array of ids of the previous land assets with the person

### land
* class
    + confirms the model is of land class
* id
    + id of the land ( hash of latLong )
* latLong
    + array of its latitude and longitude of its corners
* owner
    + id of the present owner of the land
* prevOwner
    + list of IDs of the previous owners of the land
* address 
    + address of the location   

### transaction
* class
    + confirms the model is of transaction class
* landID
    + id of the land being trasferred 
* timestamp
    + time of transaction
* from
    + id of user seller
* to
    + id of user buyer
* amount
    + price for the land has been exchanged
