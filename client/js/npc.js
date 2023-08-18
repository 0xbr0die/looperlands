
define(['character'], function(Character) {

    let NpcTalk = {};

    var Npc = Character.extend({
        init: function(id, kind) {
            this._super(id, kind, 1);
            this.itemKind = Types.getKindAsString(this.kind);

            self = this;
            axios.get("https://loopworms.io/DEV/LooperLands/getNPCDialog.php?mapId=main&npcId=" + this.itemKind).then(response => {
                console.log("npc", kind, response);
                NpcTalk[self.itemKind] = JSON.parse(response.data);

                self.talkCount = NpcTalk[self.itemKind].length;
                self.talkIndex = 0;
            });
        },
    
        talk: function() {
            var msg = null;
        
            if(this.talkIndex > this.talkCount) {
                this.talkIndex = 0;
            }
            if(this.talkIndex < this.talkCount) {
                msg = NpcTalk[this.itemKind][this.talkIndex];
            }
            this.talkIndex += 1;
            
            return msg;
        }
    });
    
    return Npc;
});