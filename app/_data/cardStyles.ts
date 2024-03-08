var styles = `
    
    .card.Monochromatic::before {
        background-image: linear-gradient(var(--rotate), #ffffff, #000000, white, black, white);
    }
    .card.Monochromatic::after {
        background-image: linear-gradient(var(--rotate), #ffffff, #000000, white, black, white);
    }
    .card .icon.Monochromatic {
        background-image: linear-gradient(var(--rotate), white 0%,  white 30%, #ffffff  80%);
    }
    .card .alteration.Monochromatic {
        color: white;
        position: relative;
    }
    .card .alteration.Monochromatic::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: white;
        opacity: 0.6;
    }
    .card.Pop.Art::before {
    background-image: linear-gradient(var(--rotate), #ad35a7, white, #bdb76b, white, #ad35a7);
    }
    .card.Pop.Art::after {
        background-image: linear-gradient(var(--rotate), #ad35a7, white, #bdb76b, white, #ad35a7);
    }
    .card .icon.Pop.Art {
        background-image: linear-gradient(var(--rotate), white 0%,  #bdb76b 30%, #ad35a7  80%);
    }
    .card .alteration.Pop.Art {
        color: #ad35a7;
        position: relative;
    }
    .card .alteration.Pop.Art::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: #ad35a7;
        opacity: 0.6;
    }

    .card.Fauvism::before {
    background-image: linear-gradient(var(--rotate), #9d80cb, white, #2472fc, white, #9d80cb);
    }
    .card.Fauvism::after {
        background-image: linear-gradient(var(--rotate), #9d80cb, white, #2472fc, white, #9d80cb);
    }
    .card .icon.Fauvism {
        background-image: linear-gradient(var(--rotate), white 0%,  #2472fc 30%, #9d80cb  80%);
    }
    .card .alteration.Fauvism {
        color: #2472fc;
        position: relative;
    }
    .card .alteration.Fauvism::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: #2472fc;
        opacity: 0.6;
    }

    .card.Ukiyo-e::before {
    background-image: linear-gradient(var(--rotate), #44e6d8, white, #bdb76b, white, #44e6d8);
    }
    .card.Ukiyo-e::after {
        background-image: linear-gradient(var(--rotate), #44e6d8, white, #bdb76b, white, #44e6d8);
    }
    .card .icon.Ukiyo-e {
        background-image: linear-gradient(var(--rotate), white 0%,  #bdb76b 30%, #44e6d8  80%);
    }
    .card .alteration.Ukiyo-e {
        color: #44e6d8;
        position: relative;
    }
    .card .alteration.Ukiyo-e::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: #44e6d8;
        opacity: 0.6;
    }

    .card.Frost::before {
    background-image: linear-gradient(var(--rotate), rgba(0,212,255,1), rgba(255,255,255,1), rgb(53, 10, 153), rgba(255,255,255,1), rgba(0,212,255,0.9988692434210527));
    }
    .card.Frost::after {
        background-image: linear-gradient(var(--rotate), rgba(0,212,255,1), rgba(255,255,255,1), rgb(53, 10, 153), rgba(255,255,255,1), rgba(0,212,255,0.9988692434210527));
    }
    .card .icon.Frost {
        background-image: linear-gradient(var(--rotate), white 0%,  rgba(0,212,255,1) 30%, rgb(53, 10, 153)  80%);
    }
    .card .alteration.Frost {
        color: rgba(0,212,255,1);
        position: relative;
    }
    .card .alteration.Frost::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: rgba(0,212,255,1);
        opacity: 0.6;
    }

    .card.Fire::before {
    background-image: linear-gradient(var(--rotate), rgba(255,117,0,1), rgba(255,255,255,1), rgba(255,0,0,1), rgba(255,255,255,1), rgba(255,117,0,1));
    }
    .card.Fire::after {
        background-image: linear-gradient(var(--rotate), rgba(255,117,0,1), rgba(255,255,255,1), rgba(255,0,0,1), rgba(255,255,255,1), rgba(255,117,0,1));
    }
    .card .icon.Fire {
        background-image: linear-gradient(var(--rotate), white 0%,  rgba(255,117,0,1) 30%, rgba(255,0,0,1)  80%);
    }
    .card .alteration.Fire {
        color: rgba(255,117,0,1);
        position: relative;
    }
    .card .alteration.Fire::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: rgba(255,117,0,1);
        opacity: 0.6;
    }

    .card.Warrior::before {
    background-image: linear-gradient(var(--rotate), rgba(255,0,0,1), rgba(255,255,255,1), rgb(221, 90, 33), rgba(255,255,255,1), rgba(255,0,0,1));
    }
    .card.Warrior::after {
        background-image: linear-gradient(var(--rotate), rgba(255,0,0,1), rgba(255,255,255,1), rgb(221, 90, 33), rgba(255,255,255,1), rgba(255,0,0,1));
    }
    .card .icon.Warrior {
        background-image: linear-gradient(var(--rotate), white 0%,  rgb(221, 90, 33) 30%, rgba(255,0,0,1)  80%);
    }
    .card .alteration.Warrior {
        color: rgba(255,0,0,1);
        position: relative;
    }
    .card .alteration.Warrior::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: rgba(255,0,0,1);
        opacity: 0.6;
    }

    .card.Evil::before {
    background-image: linear-gradient(var(--rotate), rgba(154,0,255,1), rgba(255,255,255,1), rgba(66,76,107,1), rgba(255,255,255,1), rgba(154,0,255,1));
    }
    .card.Evil::after {
        background-image: linear-gradient(var(--rotate), rgba(154,0,255,1), rgba(255,255,255,1), rgba(66,76,107,1), rgba(255,255,255,1), rgba(154,0,255,1));
    }
    .card .icon.Evil {
        background-image: linear-gradient(var(--rotate), white 0%,  rgba(66,76,107,1) 30%, rgba(154,0,255,1)  80%);
    }
    .card .alteration.Evil {
        color: rgba(154,0,255,1);
        position: relative;
    }
    .card .alteration.Evil::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: rgba(154,0,255,1);
        opacity: 0.6;
    }

    .card.Voodoo::before {
    background-image: linear-gradient(var(--rotate), rgba(154,0,255,1), rgba(255,255,255,1), rgba(66,107,75,1), rgba(255,255,255,1), rgba(154,0,255,1));
    }
    .card.Voodoo::after {
        background-image: linear-gradient(var(--rotate), rgba(154,0,255,1), rgba(255,255,255,1), rgba(66,107,75,1), rgba(255,255,255,1), rgba(154,0,255,1));
    }
    .card .icon.Voodoo {
        background-image: linear-gradient(var(--rotate), white 0%,  rgba(66,107,75,1) 30%, rgba(154,0,255,1)  80%);
    }
    .card .alteration.Voodoo {
        color: rgba(154,0,255,1);
        position: relative;
    }
    .card .alteration.Voodoo::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: rgba(154,0,255,1);
        opacity: 0.6;
    }

    .card.Golden::before {
    background-image: linear-gradient(var(--rotate), rgba(191,149,63,1), rgba(255,255,255,1), rgba(179,135,40,1), rgba(255,255,255,1), rgba(191,149,63,1));
    }
    .card.Golden::after {
        background-image: linear-gradient(var(--rotate), rgba(191,149,63,1), rgba(255,255,255,1), rgba(179,135,40,1), rgba(255,255,255,1), rgba(191,149,63,1));
    }
    .card .icon.Golden {
        background-image: linear-gradient(var(--rotate), white 0%,  rgba(191,149,63,1) 30%, rgba(179,135,40,1)  80%);
    }
    .card .alteration.Golden {
        color: rgba(191,149,63,1);
        position: relative;
    }
    .card .alteration.Golden::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: rgba(191,149,63,1);
        opacity: 0.6;
    }

    .card.Necromancer::before {
    background-image: linear-gradient(var(--rotate), rgba(63,191,83,1), rgba(255,255,255,1), rgba(40,63,179,1), rgba(255,255,255,1), rgba(86,191,63,1));
    }
    .card.Necromancer::after {
        background-image: linear-gradient(var(--rotate), rgba(63,191,83,1), rgba(255,255,255,1), rgba(40,63,179,1), rgba(255,255,255,1), rgba(86,191,63,1));
    }
    .card .icon.Necromancer {
        background-image: linear-gradient(var(--rotate), white 0%,  rgba(63,191,83,1) 30%, rgba(40,63,179,1)  80%);
    }
    .card .alteration.Necromancer {
        color: rgba(63,191,83,1);
        position: relative;
    }
    .card .alteration.Necromancer::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: rgba(63,191,83,1);
        opacity: 0.6;
    }

    .card.Fanged::before {
    background-image: linear-gradient(var(--rotate), rgba(191,63,63,1), rgba(255,255,255,1), rgba(179,40,179,1), rgba(255,255,255,1), rgba(191,63,63,1));
    }
    .card.Fanged::after {
        background-image: linear-gradient(var(--rotate), rgba(191,63,63,1), rgba(255,255,255,1), rgba(179,40,179,1), rgba(255,255,255,1), rgba(191,63,63,1));
    }
    .card .icon.Fanged {
        background-image: linear-gradient(var(--rotate), white 0%,  rgba(191,63,63,1) 30%, rgba(179,40,179,1)  80%);
    }
    .card .alteration.Fanged {
        color: rgba(191,63,63,1);
        position: relative;
    }
    .card .alteration.Fanged::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: rgba(191,63,63,1);
        opacity: 0.6;
    }

    .card.Bugbear::before {
    background-image: linear-gradient(var(--rotate), rgba(94,60,60,1), rgba(255,255,255,1), rgba(74,63,74,1), rgba(255,255,255,1), rgba(94,60,60,1));
    }
    .card.Bugbear::after {
        background-image: linear-gradient(var(--rotate), rgba(94,60,60,1), rgba(255,255,255,1), rgba(74,63,74,1), rgba(255,255,255,1), rgba(94,60,60,1));
    }
    .card .icon.Bugbear {
        background-image: linear-gradient(var(--rotate), white 0%,  rgba(94,60,60,1) 30%, rgba(74,63,74,1)  80%);
    }
    .card .alteration.Bugbear {
        color: rgba(94,60,60,1);
        position: relative;
    }
    .card .alteration.Bugbear::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: rgba(94,60,60,1);
        opacity: 0.6;
    }

    .card.Burglar::before {
    background-image: linear-gradient(var(--rotate), rgba(35,102,41,1), rgba(255,255,255,1), rgba(10,50,20,1), rgba(255,255,255,1), rgba(35,102,41,1));
    }
    .card.Burglar::after {
        background-image: linear-gradient(var(--rotate), rgba(35,102,41,1), rgba(255,255,255,1), rgba(10,50,20,1), rgba(255,255,255,1), rgba(35,102,41,1));
    }
    .card .icon.Burglar {
        background-image: linear-gradient(var(--rotate), white 0%,  rgba(35,102,41,1) 30%, rgba(10,50,20,1)  80%);
    }
    .card .alteration.Burglar {
        color: rgba(35,102,41,1);
        position: relative;
    }
    .card .alteration.Burglar::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: rgba(35,102,41,1);
        opacity: 0.6;
    }

    .card.Druid::before {
    background-image: linear-gradient(var(--rotate), rgba(45,25,25,1), rgba(255,255,255,1), rgba(44,144,76,1), rgba(255,255,255,1), rgba(45,25,25,1));
    }
    .card.Druid::after {
        background-image: linear-gradient(var(--rotate), rgba(45,25,25,1), rgba(255,255,255,1), rgba(44,144,76,1), rgba(255,255,255,1), rgba(45,25,25,1));
    }
    .card .icon.Druid {
        background-image: linear-gradient(var(--rotate), white 0%,  rgba(44,144,76,1) 30%, rgba(45,25,25,1)  80%);
    }
    .card .alteration.Druid {
        color: rgba(44,144,76,1);
        position: relative;
    }
    .card .alteration.Druid::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: rgba(44,144,76,1);
        opacity: 0.6;
    }

    .card.Oni::before {
    background-image: linear-gradient(var(--rotate), rgba(192,208,38,1), rgba(255,255,255,1), rgba(144,80,44,1), rgba(255,255,255,1), rgba(205,197,32,1));
    }
    .card.Oni::after {
        background-image: linear-gradient(var(--rotate), rgba(192,208,38,1), rgba(255,255,255,1), rgba(144,80,44,1), rgba(255,255,255,1), rgba(205,197,32,1));
    }
    .card .icon.Oni {
        background-image: linear-gradient(var(--rotate), white 0%,  rgba(192,208,38,1) 30%, rgba(144,80,44,1)  80%);
    }
    .card .alteration.Oni {
        color: rgba(192,208,38,1);
        position: relative;
    }
    .card .alteration.Oni::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: rgba(192,208,38,1);
        opacity: 0.6;
    }

    .card.Magic::before {
    background-image: linear-gradient(var(--rotate), rgba(38,99,208,1), rgba(255,255,255,1), rgba(196,110,196,1), rgba(255,255,255,1), rgba(38,99,208,1));
    }
    .card.Magic::after {
        background-image: linear-gradient(var(--rotate), rgba(38,99,208,1), rgba(255,255,255,1), rgba(196,110,196,1), rgba(255,255,255,1), rgba(38,99,208,1));
    }
    .card .icon.Magic {
        background-image: linear-gradient(var(--rotate), white 0%,  rgba(196,110,196,1) 30%, rgba(38,99,208,1)  80%);
    }
    .card .alteration.Magic {
        color: rgba(38,99,208,1);
        position: relative;
    }
    .card .alteration.Magic::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: rgba(38,99,208,1);
        opacity: 0.6;
    }

    .card.Yeti::before {
    background-image: linear-gradient(var(--rotate), rgba(38,208,206,1), rgba(255,255,255,1), rgba(210,240,237,1), rgba(255,255,255,1), rgba(38,193,208,1));
    }
    .card.Yeti::after {
        background-image: linear-gradient(var(--rotate), rgba(38,208,206,1), rgba(255,255,255,1), rgba(210,240,237,1), rgba(255,255,255,1), rgba(38,193,208,1));
    }
    .card .icon.Yeti {
        background-image: linear-gradient(var(--rotate), white 0%,  rgba(210,240,237,1) 30%, rgba(38,208,206,1)  80%);
    }
    .card .alteration.Yeti {
        color: rgba(38,208,206,1);
        position: relative;
    }
    .card .alteration.Yeti::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: rgba(38,208,206,1);
        opacity: 0.6;
    }

    .card.Hecatoncheires::before {
    background-image: linear-gradient(var(--rotate), rgba(62,40,40,1), rgba(255,255,255,1), rgba(8,154,179,1), rgba(255,255,255,1), rgba(62,40,40,1));
    }
    .card.Hecatoncheires::after {
        background-image: linear-gradient(var(--rotate), rgba(62,40,40,1), rgba(255,255,255,1), rgba(8,154,179,1), rgba(255,255,255,1), rgba(62,40,40,1));
    }
    .card .icon.Hecatoncheires {
        background-image: linear-gradient(var(--rotate), white 0%,  rgba(8,154,179,1) 30%, rgba(62,40,40,1)  80%);
    }
    .card .alteration.Hecatoncheires {
        color: rgb(156, 99, 99);
        position: relative;
    }
    .card .alteration.Hecatoncheires::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: rgb(156, 99, 99);
        opacity: 0.6;
    }

    .card.Ogre::before {
    background-image: linear-gradient(var(--rotate), rgba(38,208,85,1), rgba(255,255,255,1), rgba(21,60,21,1), rgba(255,255,255,1), rgba(45,208,38,1));
    }
    .card.Ogre::after {
        background-image: linear-gradient(var(--rotate), rgba(38,208,85,1), rgba(255,255,255,1), rgba(21,60,21,1), rgba(255,255,255,1), rgba(45,208,38,1));
    }
    .card .icon.Ogre {
        background-image: linear-gradient(var(--rotate), white 0%,  rgba(38,208,85,1) 30%, rgba(21,60,21,1)  80%);
    }
    .card .alteration.Ogre {
        color: rgba(38,208,85,1);
        position: relative;
    }
    .card .alteration.Ogre::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: rgba(38,208,85,1);
        opacity: 0.6;
    }

    .card.Shapeshifter::before {
    background-image: linear-gradient(var(--rotate), rgba(40,40,40), rgba(255,255,255,1), rgba(196,110,196,1), rgba(255,255,255,1), rgba(40,40,40));
    }
    .card.Shapeshifter::after {
        background-image: linear-gradient(var(--rotate), rgba(40,40,40), rgba(255,255,255,1), rgba(196,110,196,1), rgba(255,255,255,1), rgba(40,40,40));
    }
    .card .icon.Shapeshifter {
        background-image: linear-gradient(var(--rotate), white 0%,  rgba(196,110,196,1) 30%, rgba(40,40,40)  80%);
    }
    .card .alteration.Shapeshifter {
        color: rgba(196,110,196,1);
        position: relative;
    }
    .card .alteration.Shapeshifter::after{
        content: '';
        width: 30%;
        position: absolute;
        left: 35%;
        height: 1px;
        bottom: -3px;
        background: rgba(196,110,196,1);
        opacity: 0.6;
    }

    .card.Giant:hover {
        box-shadow: 0 2px 0 0 rgba(184, 134, 11, 1);
    }


    .card.Unicorn:hover {
        box-shadow: 0 2px 0 0 #b47084;
    }


    .card.Dragon:hover {
        box-shadow: 0 2px 0 0 rgba(173, 216, 230, 1);
    }


    .card.Demon:hover {
        box-shadow: 0 2px 0 0 rgba(139, 69, 19, 1);
    }


    .card.Wizard:hover {
        box-shadow: 0 2px 0 0 rgba(70, 130, 180, 1);
    }


    .card.Phoenix:hover {
        box-shadow: 0 2px 0 0 rgba(255, 69, 0, 1);
    }


    .card.Owl:hover {
        box-shadow: 0 2px 0 0 #acc781;
    }


    .card.Faerie:hover {
        box-shadow: 0 2px 0 0 rgba(128, 0, 128, 1) ;
    }


    .card.Zombie:hover {
        box-shadow: 0 2px 0 0 rgba(105, 105, 105, 1);
    }


    .card.Warewolf:hover {
        box-shadow: 0 2px 0 0 rgba(196,110,196,1);
    }


    .card.Vampire:hover {
        box-shadow: 0 2px 0 0 rgba(139, 0, 0, 1);
    }


    .card.Goblin:hover {
        box-shadow: 0 2px 0 0 rgba(46, 139, 87, 1);
    }


`

export default styles