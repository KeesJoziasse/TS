# Casustoets Object oriented programming

* starttijd: 09.00 uur
* eindtijd: 12.00 uur
* hulpmiddelen: internet, huiswerk en voorbeelden uit les. Je mag internet inzetten als een informatiemiddel maar niet als een communicatiemiddel.
* eigenaarschap: de code die je hebt opgeleverd is door jou ontwikkeld.

![image van game](./kiwiwars.png)

## Casusomschrijving

In dit spel probeert de speler op een kiwi te klikken voordat de kiwi is verdwenen. Als de speler op een kiwi klikt krijgt hij/zij een punt. Als de speler per ogeluk op een appel klikt dan gaat er een punt van het totaal af.

## Spelregels

* er is 1 speler
* de kiwis en appels verdwijnen na een aantal seconden.
* een appel kost 1 punt
* een kiwi levert 1 punt op
* als de appels en kiwi zijn verdwenen dan is het spel afgelopen en wordt de uiteindelijk score getoond

## Opdracht

Gegeven is een werkende uitwerking in het bestand app.ts. Merk wel op dat de code werkt, maar dat deze absoluut niet is geoptimaliseerd. Dat moet jij gaan doen. Onder andere door de juiste classes, attrubutes en methods te kiezen. Voordat je begint met refactoren is het daarom goed om eerst een class diagram te tekenen (let op: je moet ook een classdiagram inleveren). Doe hier alleen niet te lang over. Probeer vervolgens de classes een voor een te implementeren.

## Tips

* Maak als eerste een class diagram. Bedenkt welke classes je zou willen maken en welke methods en attributes de class zou moeten bevatten.
* Werk steeds 1 class per keer uit en onderzoek of alles nog werkt
* Maak het definitieve class diagram aan het einde van de toets (tijdens het uitvoeren kan e.e.a. veranderen) en lever deze ook mee in.

## Uitdagingen

* Probeer de kiwi te animeren
* Wanneer je een kiwi klikt moet hij direct uit de fruit array worden gehaald.
* Probeer de appel zelf te laten bewegen
* Probeer er voor te zorgen dat kiwi's niet over elkaar heen worden gespawned.

## Inleveren

Je levert een zip-bestand in (geen rar oid) met daarin al je code, assets en classdiagram. Let op dat je zip-bestand niet groter is dan 5mb en daarnaast ontbreken in het zip bestand de volgende bestanden/mappen.

* node_modules
* git bestanden.

## Beoordelingscriteria

Nr | Leeropbrengsten | Cesuur
--- | --- | ---
1 | past op een consistente manier indentation in de code toe | 0,2
2 | voorziet de code volgens een standaard afspraak (AirBnB styleguide) code van commentaar | 0,4
3 | geeft consistent betekenisvolle namen aan variabelen, classes en methods (AirBnB styleguide) | 0,4
4 | structureert de code in classes met attributen en methoden | 2
5 | past overerving in de code toe om herhaling (code dublicatie) te voorkomen | 2
6 | geeft types van attributen, parameters en returnwaarden expliciet (any type is niet toegestaan) aan | 2
7 | past encapsulation (private, public or protected) in een class toe zodat data van de class op een goede manier wordt verborgen voor zijn omgeving | 1
8 | past polymorphisme toe opdat code minimaal wordt herhaalt | 1
9 | past de DRY (Don't repeat yourself) principes toe zodat complexiteit van de code goed wordt verdeeld in onderhoudbare onderdelen | 1
