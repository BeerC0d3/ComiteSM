<script src="../../DataAccess/Seguridad/userRepository.ts?V=" useGetDateFormat() />

<template>
  <q-toolbar class="bg-red-9 text-white text-center shadow-2">
    <q-toolbar-title>{{ props.title }}</q-toolbar-title>
  </q-toolbar>

  <q-list bordered style="width: 100%;background-color:white;" v-for="usuario in usuarios" :key="usuario.id">

    <q-item class="q-my-sm" :tag="props.showCheck ? 'label' : ''" :v-ripple="props.showCheck">
      <q-item-section avatar>
        <q-avatar color="primary" text-color="white">
          {{ getFirstName(usuario.nombreFull) }}
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ usuario.nombreFull }}</q-item-label>
        <q-item-label caption lines="1">{{ usuario.roles }}</q-item-label>
      </q-item-section>

      <q-item-section side v-show="props.showCheck">
        <q-checkbox dense v-model="checkUser" :val="usuario.id" color="red" :id="usuario.Id" />
      </q-item-section>
      <q-item-section side v-show="props.showOptions">
        <q-btn color="grey-7" round flat icon="more_vert">
          <q-menu cover auto-close transition-show="scale" transition-hide="scale">
            <q-list>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="red" name="delete" size="25px" />

                </q-item-section>
                <q-item-section class="text-grey-7">Eliminar</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon color="orange" name="edit" size="25px" />
                </q-item-section>
                <q-item-section class="text-grey-7">Editar</q-item-section>
              </q-item>
              <!-- <q-item clickable>
                <q-item-section class="text-grey-7">Share</q-item-section>
              </q-item> -->
            </q-list>
          </q-menu>
        </q-btn>
      </q-item-section>

    </q-item>
  </q-list>
  <!-- <div class="q-px-sm q-mt-sm">
    Your selection is: <strong>{{ checkUser.join() }}</strong>

  </div> -->
</template>
