import {useNuxtApp} from "#app";

export default function() {
    return useNuxtApp().$axios
}