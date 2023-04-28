import type { Mission } from './Mission'
import type { Monster } from './Monster'
import type { MonsterAI } from './MonsterAI'
import type { MonsterGroup } from './MonsterGroup'
import type { NPC } from './Npc'

// 新手村 -1 0 0
// 迎客殿 4 30 0
// 神剑广场 16 44 3

export class GameMap {
  mapId = 0
  orgMapId = 0

  npcList: NPC[] = []
  monsterGroupList: MonsterGroup[] = []
  monsterList: Record<number, Monster> = {}
  monsterAIList: MonsterAI[] = []

  findMonsterGroupByMission(mission: Mission) {
    const npc = this.npcList.find(npc => mission.simpleDesc.includes(npc.playerName))

    if (!npc)
      return -1

    if (npc.battleID.length > 0)
      return npc.battleID[0]

    return -1
  }

  addMonsterGroup(group: MonsterGroup) {
    this.monsterGroupList[group.groupId] = group
  }

  getMonsterGroup(id: number) {
    return this.monsterGroupList[id]
  }

  clearMonsterGroup() {
    this.monsterGroupList = []
  }

  getMonster(id: number) {
    return this.monsterList[id]
  }

  addMonster(monster: Monster) {
    this.monsterList[monster.getId()] = monster
  }

  removeMonster(monster: Monster) {
    delete this.monsterList[monster.getId()]
  }

  clearMonster() {
    this.monsterList = {}
  }

  getNpcByID(t: number, e?: boolean): NPC | null {
    const n = this.npcList

    for (let i: NPC, o = n.length, a = 0; o > a; a++) {
      if (((i = n[a]), i != null && (!e || i.isVisible()) && i.getId() == t))
        return i
    }
    return null
  }
}
