# LFStrat AionDB API

## THIS API IS NOW COMPLETELY OUTDATED AS THE DATABASE BEHIND IT WAS REWORKED  #


### Intro
This is [LFStrat](http://www.lfstrat.com/aion/)'s Aion database API. It returns JSON formatted data.
If any question or suggestion, [send me an email](mailto:infuse.aion@gmail.com) or leave a message on [Github repo](https://github.com/Infuse/lfstratdb-aion-api).

### Format
```
// Returned format of "all items" routes
{
	"meta": {
		"count": n,       // nr of items per page
		"pageCount": x,   // nr of pages
		"totalCount": y,  // total nr of items
	},
	"results": [
		{...},           // item 1
		{...},           // item 2
		...
	]
}
```
```
// Returned format of "one item" routes
[
	{
		"Id": id,
		"attr1": value1,
		"attr2": value2,
		...
	}
]
```

### Routes : 
|Routes               |Method              |Description         |
|---------------------|:------------------:|:------------------:|
|/accessories         |`GET`               |All accessories     |
|/accessories/$Id     |`GET`               |Accessory with Id   |
|/armors              |`GET`               |All armors          |
|/armors/$Id          |`GET`               |Armor with Id       |
|/bracelets           |`GET`               |All bracelets       |
|/bracelets/$Id       |`GET`               |Bracelet with Id    |
|/feathers            |`GET`               |All feathers        |
|/feathers/$Id        |`GET`               |Feather with Id     |
|/manastones          |`GET`               |All manatones       |
|/manastones/$Id      |`GET`               |Manastones with Id  |
|/weapons             |`GET`               |All weapons         |
|/weapons/$Id         |`GET`               |Weapon with Id      |
|/wings               |`GET`               |All wings           |
|/wings/$Id           |`GET`               |Wings with Id       |

### Attributes
```
// Example of query
https://lfstratdb-aion-api.herokuapp.com/armors?equipmentSlots=torso&name=prae&minLevel=75&armorType=robe&page=2
```
Acceped parameters of "all items" routes:

###### Common:
+ dir: *string*, asc or desc
+ sort: *string*, an attribute for sorting
+ limit: *number* of items per page
+ page: page *number*

###### Accessories:
+ name = *string*, (partial) name of the item
+ type = *string*, one of {normal, draconic, devanion, abyss}
+ equipmentSlots = *string*, one of {head, neck, right_or_left_ea, right_or_left_fi, waist}
+ minLevel = *number*, ranging from 1 to 100
+ maxLevel = *number*, ranging from 1 to 100
+ qualities = *array*, in {common, rare, legend, unique, epic, mythic}
+ races = *array*, in {0, 1, 2} where {0=asmo, 1=elyos, 2=none}
+ highDeva = *number*, 0 for false, 1 for true
+ isPvP = *number*, 0 for false, 1 for true
+ isPvE = *number*, 0 for false, 1 for true

###### Armors:
+ name = *string*, (partial) name of the item
+ type = *string*, one of {normal, draconic, devanion, abyss}
+ equipmentSlots = *string*, one of {torso, leg, shoulder, glove, foot, sub} (sub = shield)
+ minLevel = *number*, ranging from 1 to 100
+ maxLevel = *number*, ranging from 1 to 100
+ qualities = *array*, in {common, rare, legend, unique, epic, mythic}
+ races = *array*, in {0, 1, 2} where {0=asmo, 1=elyos, 2=none}
+ highDeva = *number*, 0 for false, 1 for true
+ isPvP = *number*, 0 for false, 1 for true
+ isPvE = *number*, 0 for false, 1 for true
+ armorType = *string* one of {robe, leather, chain, plate}

###### Bracelets:
+ name = *string*, (partial) name of the item

###### Feathers:
+ name = *string*, (partial) name of the item
+ races = *array*, in {0, 1, 2} where {0=asmo, 1=elyos, 2=none}

###### Manastones:
+ name = *string*, (partial) name of the item
+ qualities = *array*, in {common, rare, legend, unique, epic, mythic}
+ minLevel = *number*, ranging from 1 to 100
+ maxLevel = *number*, ranging from 1 to 100

###### Weapons:
+ name = *string*, (partial) name of the item
+ type = *string*, one of {normal, draconic, devanion, abyss}
+ equipmentSlots = *string*, one of {main, main_or_sub}
+ minLevel = *number*, ranging from 1 to 100
+ maxLevel = *number*, ranging from 1 to 100
+ qualities = *array*, in {common, rare, legend, unique, epic, mythic}
+ races = *array*, in {0, 1, 2} where {0=asmo, 1=elyos, 2=none}
+ highDeva = *number*, 0 for false, 1 for true
+ isPvP = *number*, 0 for false, 1 for true
+ isPvE = *number*, 0 for false, 1 for true
+ weaponType = *string* one of {1h_dagger, 1h_gun, 1h_mace, 1h_sword, 2h_book, 2h_cannon, 2h_harp, 2h_keyblade, 2h_orb, 2h_polearm, 2h_staff, 2h_sword, bow}


###### Wings:
+ name = *string*, (partial) name of the item
+ type = *string*, one of {normal, draconic, devanion, abyss}
+ minLevel = *number*, ranging from 1 to 100
+ maxLevel = *number*, ranging from 1 to 100
+ qualities = *array*, in {common, rare, legend, unique, epic, mythic}
+ races = *array*, in {0, 1, 2} where {0=asmo, 1=elyos, 2=none}
+ highDeva = *number*, 0 for false, 1 for true
+ isPvP = *number*, 0 for false, 1 for true
+ isPvE = *number*, 0 for false, 1 for true

