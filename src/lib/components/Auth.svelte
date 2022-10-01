<script lang="ts">
	import { anonSignIn, magicLinkSignIn, socialSignIn } from '../auth';

	let loading = false;
	let email: string;
</script>

<section class="flex flex-row w-full items-center gap-6">
	<div class="flex flex-col gap-4 w-2/3">
		<button class="social-auth google-auth" on:click={() => socialSignIn('google')}>
			<img
				src="data:image/png;base64,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"
				alt="Google"
			/>
			<span>Sign in with Google</span>
		</button>
		<button class="social-auth discord-auth" on:click={() => socialSignIn('discord')}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="30"
				height="36"
				fill="currentColor"
				class="bi bi-discord"
				viewBox="0 0 16 16"
			>
				<path
					d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"
				/>
			</svg>
			<span>Sign in with Discord</span>
		</button>
		<button class="social-auth twitch-auth" on:click={() => socialSignIn('twitch')}>
			<svg
				width="30"
				height="36"
				viewBox="0 0 256 268"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				preserveAspectRatio="xMidYMid"
			>
				<g>
					<path
						d="M17.4579119,0 L0,46.5559188 L0,232.757287 L63.9826001,232.757287 L63.9826001,267.690956 L98.9144853,267.690956 L133.811571,232.757287 L186.171922,232.757287 L256,162.954193 L256,0 L17.4579119,0 Z M40.7166868,23.2632364 L232.73141,23.2632364 L232.73141,151.29179 L191.992415,192.033461 L128,192.033461 L93.11273,226.918947 L93.11273,192.033461 L40.7166868,192.033461 L40.7166868,23.2632364 Z M104.724985,139.668381 L127.999822,139.668381 L127.999822,69.843872 L104.724985,69.843872 L104.724985,139.668381 Z M168.721862,139.668381 L191.992237,139.668381 L191.992237,69.843872 L168.721862,69.843872 L168.721862,139.668381 Z"
						fill="#ffffff"
					/>
				</g>
			</svg>

			<span>Sign in with Twitch</span>
		</button>
		<button class="social-auth github-auth" on:click={() => socialSignIn('github')}>
			<svg
				width="30"
				height="36"
				viewBox="0 -3.5 256 256"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="xMinYMin meet"
				><g fill="#ffffff"
					><path
						d="M127.505 0C57.095 0 0 57.085 0 127.505c0 56.336 36.534 104.13 87.196 120.99 6.372 1.18 8.712-2.766 8.712-6.134 0-3.04-.119-13.085-.173-23.739-35.473 7.713-42.958-15.044-42.958-15.044-5.8-14.738-14.157-18.656-14.157-18.656-11.568-7.914.872-7.752.872-7.752 12.804.9 19.546 13.14 19.546 13.14 11.372 19.493 29.828 13.857 37.104 10.6 1.144-8.242 4.449-13.866 8.095-17.05-28.32-3.225-58.092-14.158-58.092-63.014 0-13.92 4.981-25.295 13.138-34.224-1.324-3.212-5.688-16.18 1.235-33.743 0 0 10.707-3.427 35.073 13.07 10.17-2.826 21.078-4.242 31.914-4.29 10.836.048 21.752 1.464 31.942 4.29 24.337-16.497 35.029-13.07 35.029-13.07 6.94 17.563 2.574 30.531 1.25 33.743 8.175 8.929 13.122 20.303 13.122 34.224 0 48.972-29.828 59.756-58.22 62.912 4.573 3.957 8.648 11.717 8.648 23.612 0 17.06-.148 30.791-.148 34.991 0 3.393 2.295 7.369 8.759 6.117 50.634-16.879 87.122-64.656 87.122-120.973C255.009 57.085 197.922 0 127.505 0"
					/><path
						d="M47.755 181.634c-.28.633-1.278.823-2.185.389-.925-.416-1.445-1.28-1.145-1.916.275-.652 1.273-.834 2.196-.396.927.415 1.455 1.287 1.134 1.923M54.027 187.23c-.608.564-1.797.302-2.604-.589-.834-.889-.99-2.077-.373-2.65.627-.563 1.78-.3 2.616.59.834.899.996 2.08.36 2.65M58.33 194.39c-.782.543-2.06.034-2.849-1.1-.781-1.133-.781-2.493.017-3.038.792-.545 2.05-.055 2.85 1.07.78 1.153.78 2.513-.019 3.069M65.606 202.683c-.699.77-2.187.564-3.277-.488-1.114-1.028-1.425-2.487-.724-3.258.707-.772 2.204-.555 3.302.488 1.107 1.026 1.445 2.496.7 3.258M75.01 205.483c-.307.998-1.741 1.452-3.185 1.028-1.442-.437-2.386-1.607-2.095-2.616.3-1.005 1.74-1.478 3.195-1.024 1.44.435 2.386 1.596 2.086 2.612M85.714 206.67c.036 1.052-1.189 1.924-2.705 1.943-1.525.033-2.758-.818-2.774-1.852 0-1.062 1.197-1.926 2.721-1.951 1.516-.03 2.758.815 2.758 1.86M96.228 206.267c.182 1.026-.872 2.08-2.377 2.36-1.48.27-2.85-.363-3.039-1.38-.184-1.052.89-2.105 2.367-2.378 1.508-.262 2.857.355 3.049 1.398"
					/></g
				></svg
			>

			<span>Sign in with Github</span>
		</button>
	</div>

	<div class="flex flex-col items-center">
		<form class="flex w-full" on:submit|preventDefault={() => magicLinkSignIn(email)}>
			<div class="w-full">
				<p class="text-sm">Sign in with a link sent to your email:</p>
				<div>
					<input
						class="text-md w-full mb-2 p-1"
						type="email"
						placeholder="Your email"
						bind:value={email}
					/>
				</div>

				<input
					class="social-auth github-auth"
					type="submit"
					value={loading ? 'Loading' : 'Send magic link'}
					disabled={loading}
				/>
			</div>
		</form>

		<div class="flex flex-col items-center mt-8">
			<p class="text-sm">
				you can also continue without logging in. Be warned, some features may not be available and
				your <b class="text-red-600">progress will be lost</b>.
			</p>
			<button class="social-auth github-auth" on:click={() => anonSignIn()}>
				<span>Anonymous</span>
			</button>
		</div>
	</div>
</section>

<style>
	button {
		border: 0;
		padding: 0;
	}

	button:disabled .google-auth {
		background-color: grey;
	}

	.social-auth {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 2px;
		padding: 5px 1px;
		cursor: pointer;
	}

	.google-auth {
		background-color: #4285f4;
	}
	.google-auth:hover {
		background-color: #1e68e0;
	}
	.discord-auth {
		background-color: #7289da;
		padding-left: 10px;
	}
	.discord-auth:hover {
		background-color: #4e6bd4;
	}
	.github-auth {
		border: solid white 1px;
		background-color: black;
	}

	.github-auth:hover {
		filter: invert();
	}
	.twitch-auth {
		background-color: #5a3e85;
	}

	.twitch-auth:hover {
		background-color: #6b18e7;
	}

	.social-auth img {
		background: white;
		padding: 4px;
		height: 30px;
		width: 30px;
		border-radius: 2px;
		margin: 4px;
	}

	.social-auth span {
		font-family: Roboto, sans-serif;
		font-size: 14px;
		font-weight: bold;
		padding: 0 12px;
		color: white;
	}
</style>
